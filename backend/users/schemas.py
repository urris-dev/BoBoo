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

    @field_validator("password", mode="before")
    def validate_pswd(cls, value):
        pattern = settings.REGEX_PASSWORD_TEMPLATE
        if not fullmatch(pattern, value):
            raise ValueError("Неверный формат пароля.")
        return value


class UserLogin(BaseModel):
    email: Annotated[EmailStr, Field(max_length=255)]
    password: Annotated[str, Field(min_length=8, max_length=100)]

    @field_validator("password", mode="before")
    def validate_pswd(cls, value):
        pattern = settings.REGEX_PASSWORD_TEMPLATE
        if not fullmatch(pattern, value):
            raise ValueError("Неверный формат пароля.")
        return value


class UserConfirmEmail(BaseModel):
    email: Annotated[EmailStr, Field(max_length=255)]
    confirmation_code: Annotated[str, Field(alias="code", min_length=36, max_length=36)]


class UserResetPassword(BaseModel):
    email: Annotated[EmailStr, Field(max_length=255)]
    confirmation_code: Annotated[str, Field(alias="code", min_length=36, max_length=36)]
    new_password: Annotated[str, Field(alias="password", min_length=8, max_length=100)]

    @field_validator("new_password", mode="before")
    def validate_pswd(cls, value):
        pattern = settings.REGEX_PASSWORD_TEMPLATE
        if not fullmatch(pattern, value):
            raise ValueError("Неверный формат пароля.")
        return value


class UserChangePassword(BaseModel):
    old_password: Annotated[str, Field(min_length=8, max_length=100)]
    new_password: Annotated[str, Field(min_length=8, max_length=100)]

    @field_validator("new_password", mode="before")
    def validate_pswd(cls, value):
        pattern = settings.REGEX_PASSWORD_TEMPLATE
        if not fullmatch(pattern, value):
            raise ValueError("Неверный формат пароля.")
        return value


class ServerResponse(BaseModel):
    status: str
    msg: Optional[str] = ""
