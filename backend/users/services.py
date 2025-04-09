from aiohttp import ClientSession
from datetime import date
from fastapi.responses import Response
from fastapi.exceptions import HTTPException
from os import mkdir, path
from typing import Union
from shutil import rmtree

import oauth2
from config import settings
from . import models, schemas, smtp, utils, _BASE_DIR


JWT_ACCESS_TOKEN_EXPIRES_IN = settings.JWT_ACCESS_TOKEN_EXPIRES_IN * 60
JWT_REFRESH_TOKEN_EXPIRES_IN = settings.JWT_REFRESH_TOKEN_EXPIRES_IN * 60


async def delete_outdated_not_confirmed_users():
    await models.NotConfirmedUser.objects.delete(create_at__lt=date.today())

async def delete_outdated_reset_password_users():
    await models.ResetPasswordUser.objects.delete(create_at__lt=date.today())


async def save_user_photo(url: str, username: str) -> str:
    dir_path = path.join(_BASE_DIR, "media", username)
    file_path = path.join(dir_path, "photo.png")
    
    mkdir(dir_path)
    async with ClientSession() as session:
        async with session.get(url) as response:
            with open(file_path, "wb") as file:
                file.write(await response.read())
    
    return f"/media/{username}/photo.png"


async def login_with_google(user: schemas.GoogleUser, Authorize: oauth2.AuthJWT) -> Response:
    try:
        await models.User.objects.get(email=user.email)
    except:
        photo_path = await save_user_photo(user.photo, user.username)
        user.photo = photo_path
        await models.User.objects.create(**user.model_dump())

    access_token = Authorize.create_access_token(subject=user.email)
    refresh_token = Authorize.create_refresh_token(subject=user.email)
    response = Response(status_code=200)
    Authorize.set_access_cookies(access_token, response, max_age=JWT_ACCESS_TOKEN_EXPIRES_IN)
    Authorize.set_refresh_cookies(refresh_token, response, max_age=JWT_REFRESH_TOKEN_EXPIRES_IN)

    return response


async def create_not_confirmed_user(user: schemas.UserRegister) -> Union[HTTPException, Response]:
    try:
        await models.User.objects.get(email=user.email)
        raise HTTPException(status_code=409, detail="Данный пользователь уже зарегистрирован.")
    except HTTPException as e:
        raise e
    except:pass

    try:
        _user = await models.NotConfirmedUser.objects.get(email=user.email)
        code = await utils.generate_confirm_code()
        await smtp.send_email_confirmation_code(_user.username, _user.email, code)

        _user.username = user.username
        _user.password = await utils.hash_data(user.password)
        _user.confirmation_code = await utils.hash_data(code)
        await _user.update(["username", "password", "confirmation_code"])
    except:
        code = await utils.generate_confirm_code()
        await smtp.send_email_confirmation_code(user.username, user.email, code)

        code = await utils.hash_data(code)
        user.password = await utils.hash_data(user.password)
        await models.NotConfirmedUser.objects.create(**user.model_dump(), **{"confirmation_code": code})
    
    return Response(status_code=200)


async def create_user(user: schemas.UserConfirmEmail) -> Union[HTTPException, Response]:
    try:
        _user = await models.NotConfirmedUser.objects.get(email=user.email)
    except:
        raise HTTPException(status_code=404, detail="Пользователь с данным адресом электронной почты не найден.")

    if not(await utils.verify_data(user.confirmation_code, _user.confirmation_code)):
        raise HTTPException(status_code=400, detail="Неправильный код подтверждения.")

    user = schemas.UserRegister.model_validate(_user, from_attributes=True)
    await models.User.objects.create(**user.model_dump())
    await _user.delete()

    return Response(status_code=200)


async def login_user(user: schemas.UserLogin, Authorize: oauth2.AuthJWT) -> Union[HTTPException, Response]:
    try:
        _user = await models.User.objects.get(email=user.email)
    except:
        raise HTTPException(status_code=400, detail="Неправильная почта или пароль.")
    
    if not(await utils.verify_data(user.password, _user.password)):
        raise HTTPException(status_code=400, detail="Неправильная почта или пароль.")
    
    access_token = Authorize.create_access_token(subject=user.email)
    refresh_token = Authorize.create_refresh_token(subject=user.email)
    response = Response(status_code=200)
    Authorize.set_access_cookies(access_token, response, max_age=JWT_ACCESS_TOKEN_EXPIRES_IN)
    Authorize.set_refresh_cookies(refresh_token, response, max_age=JWT_REFRESH_TOKEN_EXPIRES_IN)

    return response


async def recreate_tokens(Authorize: oauth2.AuthJWT) -> Response:
    email = Authorize.get_jwt_subject()
    access_token = Authorize.create_access_token(subject=email)
    refresh_token = Authorize.create_refresh_token(subject=email)
    response = Response(status_code=200)
    Authorize.set_access_cookies(access_token, response, max_age=JWT_ACCESS_TOKEN_EXPIRES_IN)
    Authorize.set_refresh_cookies(refresh_token, response, max_age=JWT_REFRESH_TOKEN_EXPIRES_IN)

    return response


async def get_user_data(Authorize: oauth2.AuthJWT) -> schemas.User:
    user_email = Authorize.get_jwt_subject()
    user = await models.User.objects.get(email=user_email)

    return schemas.User(username=user.username, email=user.email, photo=f"{settings.SERVER_ORIGIN}{user.photo}")


async def change_user_account_password(email: str, new_password: str):
    user = await models.User.objects.get(email=email)
    user.password = await utils.hash_data(new_password)
    await user.update(["password"])


async def password_reset(email: str) -> Union[HTTPException, Response]:
    try:
        user = await models.User.objects.get(email=email)
    except:
        raise HTTPException(status_code=404, detail="Пользователь с данным адресом электронной почты не найден.")
    
    try:
        _user = await models.ResetPasswordUser.objects.get(email=user.email)
        code = await utils.generate_confirm_code()
        await smtp.send_password_reset_code(user.username, user.email, code)

        _user.confirmation_code = await utils.hash_data(code)
        await _user.update(["confirmation_code"])
    except:
        code = await utils.generate_confirm_code()
        await smtp.send_password_reset_code(user.username, user.email, code)

        code = await utils.hash_data(code)
        await models.ResetPasswordUser.objects.create(**{"email": user.email, "confirmation_code": code})
    
    return Response(status_code=200)


async def reset_password(user: schemas.UserResetPassword) -> Union[HTTPException, Response]:
    try:
        _user = await models.ResetPasswordUser.objects.get(email=user.email)
    except:
        raise HTTPException(status_code=404, detail="Пользователь с данным адресом электронной почты не найден.")

    if not(await utils.verify_data(user.confirmation_code, _user.confirmation_code)):
        raise HTTPException(status_code=400, detail="Неправильный код подтверждения.")

    await change_user_account_password(email=_user.email, new_password=user.new_password)
    await _user.delete()
    return Response(status_code=200)


async def change_password(user: schemas.UserChangePassword, Authorize: oauth2.AuthJWT) -> Union[HTTPException, Response]:
    email = Authorize.get_jwt_subject()
    _user = await models.User.objects.get(email=email)

    if not(await utils.verify_data(user.old_password, _user.password)):
        raise HTTPException(status_code=400, detail="Неправильный старый пароль.")
    
    await change_user_account_password(email=_user.email, new_password=user.new_password)
    response = Response(status_code=200) 
    Authorize.unset_jwt_cookies(response)
    return response


async def delete_account(Authorize: oauth2.AuthJWT) -> Response:
    email = Authorize.get_jwt_subject()
    _user = await models.User.objects.get(email=email)

    rmtree(path.join(_BASE_DIR, "media", _user.username))
    await _user.delete()
    response = Response(status_code=200)
    Authorize.unset_jwt_cookies(response)
    
    return response
