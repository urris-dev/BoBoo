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
        code = await smtp.send_confirmation_mail(user.username, user.email)
        user.password = await utils.hash_password(user.password)
        await models.NotConfirmedUser.objects.create(**user.model_dump(), **{"confirmation_code": code})
    
    return schemas.ServerResponse(status="success")


async def create_user(code: str) -> schemas.ServerResponse:
    try:
        user = await models.NotConfirmedUser.objects.get(confirmation_code=code)
    except:
        return schemas.ServerResponse(status="error", msg="Пользователь с данным кодом подтверждения не найден.")
    
    user = schemas.UserRegister.model_validate(user, from_attributes=True)
    user = await models.User.objects.create(**user.model_dump())
    await models.NotConfirmedUser.objects.delete(confirmation_code=code)

    return schemas.ServerResponse(status="success")


async def login_user(user: schemas.UserLogin, Authorize: ouath2.AuthJWT) -> schemas.ServerResponse:
    try:
        _user = await models.User.objects.get(email=user.email)
    except:
        return schemas.ServerResponse(status="error", msg="Неправильная почта или пароль.")
    
    if not(await utils.verify_password(user.password, _user.password)):
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
