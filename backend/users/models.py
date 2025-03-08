import ormar
from database import base_ormar_config
from typing import ForwardRef, Optional, List


UserRef = ForwardRef("User")


class Friendship(ormar.Model):
    ormar_config = base_ormar_config.copy(tablename='frienships')


class User(ormar.Model):
    ormar_config = base_ormar_config.copy(tablename='users')

    id: int = ormar.Integer(primary_key=True)
    username: str = ormar.String(nullable=False, max_length=50)
    email: str = ormar.String(index=True, unique=True, nullable=False, max_length=255)
    password: Optional[str] = ormar.String(nullable=True, max_length=255)
    photo: Optional[str] = ormar.String(nullable=True, max_length=500)
    friends: Optional[List["User"]] = ormar.ManyToMany(UserRef, through=Friendship)
    is_confirmed: bool = ormar.Boolean(nullable=False, default=False)
    confirmation_token: str = ormar.String(nullable=False, max_length=100)


User.update_forward_refs()
