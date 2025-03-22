from aiohttp import ClientSession
from datetime import date
from os import mkdir, path

from config import settings
from . import models, ouath2, schemas, smtp, utils, _BASE_DIR


JWT_ACCESS_TOKEN_EXPIRES_IN = settings.JWT_ACCESS_TOKEN_EXPIRES_IN * 60
JWT_REFRESH_TOKEN_EXPIRES_IN = settings.JWT_REFRESH_TOKEN_EXPIRES_IN * 60


async def delete_outdated_not_confirmed_users():
    await models.NotConfirmedUser.objects.delete(create_at__lt=date.today())
    

async def save_user_photo(url: str, username: str) -> str:
    dir_path = path.join(_BASE_DIR, "media", username)
    file_path = path.join(dir_path, "photo.png")
    
    mkdir(dir_path)
    async with ClientSession() as session:
        async with session.get(url) as response:
            with open(file_path, "wb") as file:
                file.write(await response.read())
    
    return file_path


async def login_with_google(user: schemas.GoogleUser, Authorize: ouath2.AuthJWT) -> schemas.ServerResponse:
    user = schemas.GoogleUser.model_validate(user, from_attributes=True)

    try:
        await models.User.objects.get(email=user.email)
    except:
        photo_path = await save_user_photo(user.photo, user.username)
        user.photo = photo_path
        await models.User.objects.create(**user.model_dump())

    access_token = Authorize.create_access_token(subject=user.email)
    refresh_token = Authorize.create_refresh_token(subject=user.email)
    Authorize.set_access_cookies(access_token, max_age=JWT_ACCESS_TOKEN_EXPIRES_IN)
    Authorize.set_refresh_cookies(refresh_token, max_age=JWT_REFRESH_TOKEN_EXPIRES_IN)

    return schemas.ServerResponse(status="success")


async def create_not_confirmed_user(user: schemas.UserRegister) -> schemas.ServerResponse:
    try:
        await models.User.objects.get(email=user.email)
        return schemas.ServerResponse(status="error", msg="Данный пользователь уже зарегистрирован.")
    except: pass

    try:
        await models.NotConfirmedUser.objects.get(email=user.email)
    except:
        code = await smtp.send_email_confirmation_code(user.username, user.email)
        code = await utils.hash_data(code)
        user.password = await utils.hash_data(user.password)
        await models.NotConfirmedUser.objects.create(**user.model_dump(), **{"confirmation_code": code})
    
    return schemas.ServerResponse(status="success")


async def create_user(user: schemas.UserConfirmEmail) -> schemas.ServerResponse:
    try:
        _user = await models.NotConfirmedUser.objects.get(email=user.email)
    except:
        return schemas.ServerResponse(status="error", msg="Пользователь с данным адресом электронной почты не найден.")
    
    if not(await utils.verify_data(user.confirmation_code, _user.confirmation_code)):
        return schemas.ServerResponse(status="error", msg="Неправильный код подтверждения.")

    user = schemas.UserRegister.model_validate(_user, from_attributes=True)
    await models.User.objects.create(**user.model_dump())
    await _user.delete()

    return schemas.ServerResponse(status="success")


async def login_user(user: schemas.UserLogin, Authorize: ouath2.AuthJWT) -> schemas.ServerResponse:
    try:
        _user = await models.User.objects.get(email=user.email)
    except:
        return schemas.ServerResponse(status="error", msg="Неправильная почта или пароль.")
    
    if not(await utils.verify_data(user.password, _user.password)):
        return schemas.ServerResponse(status="error", msg="Неправильная почта или пароль.")
    
    access_token = Authorize.create_access_token(subject=user.email)
    refresh_token = Authorize.create_refresh_token(subject=user.email)
    Authorize.set_access_cookies(access_token, max_age=JWT_ACCESS_TOKEN_EXPIRES_IN)
    Authorize.set_refresh_cookies(refresh_token, max_age=JWT_REFRESH_TOKEN_EXPIRES_IN)

    return schemas.ServerResponse(status="success")


async def recreate_tokens(Authorize: ouath2.AuthJWT) -> schemas.ServerResponse:
    try:
        Authorize.jwt_refresh_token_required()
    except:
        return schemas.ServerResponse(status="error", msg="Срок действия токена обновления истёк.")
    
    email = Authorize.get_jwt_subject()
    access_token = Authorize.create_access_token(subject=email)
    refresh_token = Authorize.create_refresh_token(subject=email)
    Authorize.set_access_cookies(access_token, max_age=JWT_ACCESS_TOKEN_EXPIRES_IN)
    Authorize.set_refresh_cookies(refresh_token, max_age=JWT_REFRESH_TOKEN_EXPIRES_IN)

    return schemas.ServerResponse(status="success")


async def get_user_data(Authorize: ouath2.AuthJWT):
    try:
        Authorize.jwt_required()
    except:
        return schemas.ServerResponse(status="error", msg="Срок действия токена доступа истёк.")

    user_email = Authorize.get_jwt_subject()
    return {"your_email": user_email}


async def change_user_account_password(email: str, new_password: str):
    user = await models.User.objects.get(email=email)
    user.password = await utils.hash_data(new_password)
    await user.update(["password"])


async def password_reset(email: str) -> schemas.ServerResponse:
    try:
        user = await models.User.objects.get(email=email)
    except:
        return schemas.ServerResponse(status="error", msg="Пользователь с данным адресом электронной почты не найден.")
    
    try:
        await models.ResetPasswordUser.objects.get(email=user.email)
    except:
        code = await smtp.send_password_reset_code(user.username, user.email)
        code = await utils.hash_data(code)
        await models.ResetPasswordUser.objects.create(**{"email": user.email, "confirmation_code": code})
    
    return schemas.ServerResponse(status="success")


async def reset_password(user: schemas.UserResetPassword) -> schemas.ServerResponse:
    try:
        _user = await models.ResetPasswordUser.objects.get(email=user.email)
    except:
        return schemas.ServerResponse(status="error", msg="Пользователь с данным адресом электронной почты не найден.")

    if not(await utils.verify_data(user.confirmation_code, _user.confirmation_code)):
        return schemas.ServerResponse(status="error", msg="Неправильный код подтверждения.")

    await change_user_account_password(email=_user.email, new_password=user.new_password)
    await _user.delete()
    return schemas.ServerResponse(status="success")


async def change_password(user: schemas.UserChangePassword, Authorize: ouath2.AuthJWT) -> schemas.ServerResponse:
    try:
        Authorize.jwt_required()
    except:
        return schemas.ServerResponse(status="error", msg="Срок действия токена доступа истёк.")

    email = Authorize.get_jwt_subject()
    _user = await models.User.objects.get(email=email)

    if not(await utils.verify_data(user.old_password, _user.password)):
        return schemas.ServerResponse(status="error", msg="Неправильный старый пароль.")
    
    await change_user_account_password(email=_user.email, new_password=user.new_password)
    Authorize.unset_jwt_cookies()
    return schemas.ServerResponse(status="success")
    