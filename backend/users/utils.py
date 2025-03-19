from passlib.context import CryptContext


pwd_context = CryptContext(schemes=["bcrypt"])


async def hash_password(password: str) -> str:
    return pwd_context.hash(password)


async def verify_password(password: str, hashed_password: str) -> bool:
    return pwd_context.verify(password, hashed_password)
