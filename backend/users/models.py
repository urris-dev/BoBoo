import ormar
from database import base_ormar_config
from datetime import date
from sqlalchemy import func
from typing import ForwardRef, List, Optional


UserRef = ForwardRef("User")


class Friendship(ormar.Model):
    ormar_config = base_ormar_config.copy(tablename='frienships')


class User(ormar.Model):
    ormar_config = base_ormar_config.copy(tablename='users')

    id: int = ormar.Integer(primary_key=True)
    username: str = ormar.String(nullable=False, max_length=50)
    email: str = ormar.String(index=True, unique=True, nullable=False, max_length=255)
    password: Optional[str] = ormar.String(nullable=True, max_length=140)
    photo: Optional[str] = ormar.String(nullable=True, max_length=500)
    friends: Optional[List["User"]] = ormar.ManyToMany(UserRef, through=Friendship)


User.update_forward_refs()


class NotConfirmedUser(ormar.Model):
    ormar_config = base_ormar_config.copy(tablename='not_confirmed_users')

    username: str = ormar.String(nullable=False, max_length=50)
    email: str = ormar.String(primary_key=True, max_length=255)
    password: str = ormar.String(nullable=False, max_length=140)
    confirmation_code: str = ormar.String(nullable=False, max_length=60)
    create_at: date = ormar.Date(server_default=func.now())


class ResetPasswordUser(ormar.Model):
    ormar_config = base_ormar_config.copy(tablename='reset_password_users')

    email: str = ormar.String(primary_key=True, max_length=255)
    confirmation_code: str = ormar.String(nullable=False, max_length=60)
