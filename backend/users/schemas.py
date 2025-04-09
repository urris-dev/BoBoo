from pydantic import BaseModel, Field, EmailStr, field_validator
from re import fullmatch
from typing import Annotated

from config import settings


class GoogleUser(BaseModel):
    username: Annotated[str, Field(min_length=1, max_length=50)]
    email: Annotated[EmailStr, Field(max_length=255)]
    photo: str


class User(BaseModel):
    username: str
    email: str
    photo: str


class UserRegister(BaseModel):
    username: Annotated[str, Field(min_length=1, max_length=50)]
    email: Annotated[EmailStr, Field(max_length=255)]
    password: Annotated[str, Field(min_length=8, max_length=60)]

    @field_validator("password", mode="before")
    def validate_pswd(cls, value):
        pattern = settings.REGEX_PASSWORD_TEMPLATE
        if not fullmatch(pattern, value):
            raise ValueError("Неверный формат пароля.")
        return value


class UserLogin(BaseModel):
    email: Annotated[EmailStr, Field(max_length=255)]
    password: Annotated[str, Field(min_length=8, max_length=60)]

    @field_validator("password", mode="before")
    def validate_pswd(cls, value):
        pattern = settings.REGEX_PASSWORD_TEMPLATE
        if not fullmatch(pattern, value):
            raise ValueError("Неверный формат пароля.")
        return value


class UserConfirmEmail(BaseModel):
    email: Annotated[EmailStr, Field(max_length=255)]
    confirmation_code: Annotated[str, Field(alias="code", min_length=7, max_length=7)]


class UserResetPassword(BaseModel):
    email: Annotated[EmailStr, Field(max_length=255)]
    confirmation_code: Annotated[str, Field(alias="code", min_length=7, max_length=7)]
    new_password: Annotated[str, Field(alias="password", min_length=8, max_length=60)]

    @field_validator("new_password", mode="before")
    def validate_pswd(cls, value):
        pattern = settings.REGEX_PASSWORD_TEMPLATE
        if not fullmatch(pattern, value):
            raise ValueError("Неверный формат пароля.")
        return value


class UserChangePassword(BaseModel):
    old_password: Annotated[str, Field(min_length=8, max_length=60)]
    new_password: Annotated[str, Field(min_length=8, max_length=60)]

    @field_validator("new_password", mode="before")
    def validate_pswd(cls, value):
        pattern = settings.REGEX_PASSWORD_TEMPLATE
        if not fullmatch(pattern, value):
            raise ValueError("Неверный формат пароля.")
        return value
