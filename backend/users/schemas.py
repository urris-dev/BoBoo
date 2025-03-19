from pydantic import BaseModel, Field, EmailStr, field_validator
from re import fullmatch
from typing import Annotated, Optional

from config import settings


class GoogleUser(BaseModel):
    username: Annotated[str, Field(alias="name", min_length=1, max_length=50)]
    email: Annotated[EmailStr, Field(max_length=255)]
    photo: Annotated[str, Field(alias="picture")]


class UserRegister(BaseModel):
    username: Annotated[str, Field(min_length=1, max_length=50)]
    email: Annotated[EmailStr, Field(max_length=255)]
    password: Annotated[str, Field(min_length=8, max_length=100)]

    @field_validator("password")
    def validate_pswd(cls, value):
        pattern = settings.REGEX_PASSWORD_TEMPLATE
        if not fullmatch(pattern, value):
            raise ValueError("Неверный формат пароля.")
        return value


class UserLogin(BaseModel):
    email: Annotated[EmailStr, Field(max_length=255)]
    password: Annotated[str, Field(min_length=8, max_length=100)]

    @field_validator("password")
    def validate_pswd(cls, value):
        pattern = settings.REGEX_PASSWORD_TEMPLATE
        if not fullmatch(pattern, value):
            raise ValueError("Неверный формат пароля.")
        return value


class ServerResponse(BaseModel):
    status: str
    msg: Optional[str] = ""
