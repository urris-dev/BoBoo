from pydantic import BaseModel, Field, EmailStr
from typing import Annotated


class GoogleUser(BaseModel):
    username: Annotated[str, Field(alias="name", min_length=1, max_length=50)]
    email: EmailStr
    photo: Annotated[str, Field(alias="picture")]
    is_confirmed: Annotated[bool, Field(alias="email_verified")]


class Token(BaseModel):
    token: str


class UserData(BaseModel):
    user_id: int
    user_email: str