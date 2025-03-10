from datetime import datetime, timedelta, timezone
from dotenv import dotenv_values
from jwt import decode, encode, ExpiredSignatureError, InvalidTokenError
from . import _ENV_PATH, schemas


env = dotenv_values(_ENV_PATH)

ALGORITHM = "HS256"
SECRET_KEY = env.get("JWT_SECRET_KEY")


def create_token(user_id: int, user_email: str) -> schemas.Token:
    payload = {
        "user_id": user_id,
        "user_email": user_email,
        "exp": datetime.now(timezone.utc) + timedelta(hours=1),
        "iat": datetime.now(timezone.utc),
        "nbf": datetime.now(timezone.utc)
    }
    tk = encode(payload, SECRET_KEY, ALGORITHM)
    return schemas.Token(token=tk)


def decode_token(token: str) -> schemas.UserData | dict:
    try:
        payload = decode(token, SECRET_KEY, ALGORITHM)
    except ExpiredSignatureError:
        return {"status": "token has expired"}
    except InvalidTokenError:
        return {"status": "token is invalid"}
    return schemas.UserData(user_id=payload.get("user_id"), user_email=payload.get("user_email"))
