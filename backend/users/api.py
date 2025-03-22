from authlib.integrations.starlette_client import OAuth, OAuthError
from fastapi import APIRouter, Depends, Request
from starlette.config import Config
from typing import Union

from config import settings
from . import ouath2, schemas, services


config = Config(environ={"GOOGLE_CLIENT_ID": settings.GOOGLE_CLIENT_ID, "GOOGLE_CLIENT_SECRET": settings.GOOGLE_CLIENT_SECRET})
oauth = OAuth(config)
oauth.register(
    name='google',
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_kwargs={"scope": "openid email profile"}
)

user_router = APIRouter(tags=["users"])


@user_router.route('/google-login')
async def google_login(request: Request):
    redirect_uri = request.url_for('google_auth')
    return await oauth.google.authorize_redirect(request, redirect_uri)


@user_router.get('/auth', response_model=schemas.ServerResponse)
async def google_auth(request: Request, Authorize: ouath2.AuthJWT = Depends()):
    try:
        google_token = await oauth.google.authorize_access_token(request)
    except OAuthError:
        return schemas.ServerResponse(status="error", msg="Ошибка при попытке входа через Google.")
    
    return await services.login_with_google(google_token.get("userinfo"), Authorize)


@user_router.post("/register", response_model=schemas.ServerResponse)
async def register(user: schemas.UserRegister):
    return await services.create_not_confirmed_user(user)


@user_router.post("/confirm-email", response_model=schemas.ServerResponse)
async def confirm_email(user: schemas.UserConfirmEmail):
    return await services.create_user(user)


@user_router.post("/login", response_model=schemas.ServerResponse)
async def login(user: schemas.UserLogin, Authorize: ouath2.AuthJWT = Depends()):
    return await services.login_user(user, Authorize)


@user_router.delete("/logout", response_model=schemas.ServerResponse)
async def logout(Authorize: ouath2.AuthJWT = Depends()):
    Authorize.unset_jwt_cookies()
    return schemas.ServerResponse(status="success")


@user_router.post("/refresh", response_model=schemas.ServerResponse)
async def refresh(Authorize: ouath2.AuthJWT = Depends()):
    return await services.recreate_tokens(Authorize)


@user_router.get("/about-me", response_model=Union[schemas.ServerResponse, dict[str, str]])
async def user_about(Authorize: ouath2.AuthJWT = Depends()):
    return await services.get_user_data(Authorize)


@user_router.post("/send-password-reset-code", response_model=schemas.ServerResponse)
async def password_reset(email: str):
    return await services.password_reset(email)


@user_router.post("/reset-password", response_model=schemas.ServerResponse)
async def reset_password(user: schemas.UserResetPassword):
    return await services.reset_password(user)


@user_router.post("/change-password", response_model=schemas.ServerResponse)
async def change_password(user: schemas.UserChangePassword, Authorize: ouath2.AuthJWT = Depends()):
    return await services.change_password(user, Authorize)
