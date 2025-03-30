from fastapi import APIRouter, Depends
from typing import Union

from . import ouath2, schemas, services


user_router = APIRouter(tags=["users"])


@user_router.post('/google-login', response_model=schemas.ServerResponse)
async def google_login(user: schemas.GoogleUser, Authorize: ouath2.AuthJWT = Depends()):
    return await services.login_with_google(user, Authorize)


@user_router.post("/send-email-confirmation-code", response_model=schemas.ServerResponse)
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
