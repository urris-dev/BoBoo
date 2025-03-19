from aiohttp import ClientSession
from datetime import date
from dotenv import dotenv_values
from os import mkdir, path
from . import models, schemas, smtp, tokenizator, _BASE_DIR


config = dotenv_values("../.env")


async def delete_outdated_not_confirmed_users():
    await models.NotConfirmedUser.objects.delete(create_at__lt=date.today())
    

async def save_user_photo(url: str, username: str) -> str:
    dir_path = path.join(_BASE_DIR, "media", username)
    file_path = path.join(dir_path, "photo.png")
    
    if path.exists(file_path):
        return file_path
    
    if not path.exists(dir_path):
        mkdir(dir_path)
    
    async with ClientSession() as session:
        async with session.get(url) as response:
            with open(file_path, "wb") as file:
                file.write(await response.read())
    
    return file_path


async def create_user_with_google(user: schemas.GoogleUser) -> schemas.Token:
    user = schemas.GoogleUser.model_validate(user, from_attributes=True)
    
    photo = await save_user_photo(user.photo, user.username)
    user.photo = photo

    try:
        _user = await models.User.objects.get(email=user.email)
    except:
        _user = await models.User.objects.create(**user.model_dump())

    return tokenizator.create_token(_user.id, _user.email)


async def create_not_confirmed_user(user: schemas.UserRegister) -> dict[str, str]:
    try:
        await models.User.objects.get(email=user.email)
        return {"status": "error", "msg": "Данный пользователь уже зарегистрирован."}
    except: pass

    try:
        await models.NotConfirmedUser.objects.get(email=user.email)
    except:
        code = await smtp.send_confirmation_mail(user.email)
        await models.NotConfirmedUser.objects.create(**user.model_dump(), **{"confirmation_code": code})
    
    return {"status": "success"}


async def create_user(code: str) -> schemas.Token | dict[str, str]:
    try:
        user = await models.NotConfirmedUser.objects.get(confirmation_code=code)
    except:
        return {"status": "error", "msg": "Пользователь с данным кодом подтверждения не найден."}
    
    user = schemas.UserRegister.model_validate(user, from_attributes=True)
    user = await models.User.objects.create(**user.model_dump())
    await models.NotConfirmedUser.objects.delete(confirmation_code=code)

    return tokenizator.create_token(user.id, user.email)
