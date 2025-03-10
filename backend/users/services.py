from aiohttp import ClientSession
from dotenv import dotenv_values
from os import mkdir, path
from . import models, schemas, tokenizator, _BASE_DIR


config = dotenv_values("../.env")


async def create_user(user: schemas.GoogleUser) -> schemas.Token:
    user = schemas.GoogleUser.model_validate(user, from_attributes=True)
    
    photo = await save_user_photo(user.photo, user.username)
    user.photo = photo

    _user = await models.User.objects.get_or_create(**user.model_dump())
    return tokenizator.create_token(_user[0].id, _user[0].email)


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
