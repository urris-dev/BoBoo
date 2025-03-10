from authlib.integrations.starlette_client import OAuth, OAuthError
from dotenv import dotenv_values
from fastapi import APIRouter, Request
from starlette.config import Config
from . import _ENV_PATH, schemas, services, tokenizator


env = dotenv_values(_ENV_PATH)

config = Config(environ={"GOOGLE_CLIENT_ID": env.get("GOOGLE_CLIENT_ID"), "GOOGLE_CLIENT_SECRET": env.get("GOOGLE_CLIENT_SECRET")})
oauth = OAuth(config)
oauth.register(
    name='google',
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_kwargs={"scope": "openid email profile"}
)

user_router = APIRouter()


@user_router.route('/google-login')
async def login(request: Request):
    redirect_uri = request.url_for('auth')
    return await oauth.google.authorize_redirect(request, redirect_uri)


@user_router.get('/auth')
async def auth(request: Request) -> schemas.Token | dict:
    try:
        google_token = await oauth.google.authorize_access_token(request)
    except OAuthError:
        return {"status": "error"}
    
    return await services.create_user(google_token.get("userinfo"))


@user_router.get('/decode-token')
async def decode(token: str) -> schemas.UserData | dict:
    return tokenizator.decode_token(token)
