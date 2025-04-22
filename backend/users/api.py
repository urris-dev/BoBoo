from fastapi import APIRouter, Depends, Response

import oauth2
from dependencies import check_access_token, check_refresh_token
from . import schemas, services


user_router = APIRouter(
    prefix="/api/users",
    tags=["users"]
    )


@user_router.post('/google-login', responses={401: {}})
async def google_login(user: schemas.GoogleUser, Authorize: oauth2.AuthJWT = Depends()):
    return await services.login_with_google(user, Authorize)


@user_router.post("/send-email-confirmation-code", responses={409: {}})
async def register(user: schemas.UserRegister):
    return await services.create_not_confirmed_user(user)


@user_router.post("/confirm-email", responses={400: {}, 404: {}})
async def confirm_email(user: schemas.UserConfirmEmail):
    return await services.create_user(user)


@user_router.post("/login", responses={400: {}})
async def login(user: schemas.UserLogin, Authorize: oauth2.AuthJWT = Depends()):
    return await services.login_user(user, Authorize)


@user_router.delete("/logout")
async def logout(Authorize: oauth2.AuthJWT = Depends()):
    response = Response(status_code=200) 
    Authorize.unset_jwt_cookies(response)
    return response


@user_router.post("/refresh", dependencies=[Depends(check_refresh_token)], responses={401: {}})
async def refresh(Authorize: oauth2.AuthJWT = Depends()):
    return await services.recreate_tokens(Authorize)


@user_router.get("/user-about/", dependencies=[Depends(check_access_token)], responses={401: {}}, response_model=schemas.User)
async def user_about(Authorize: oauth2.AuthJWT = Depends()):
    return await services.get_user_data(Authorize)


@user_router.post("/send-password-reset-code", responses={404: {}})
async def password_reset(email: str):
    return await services.password_reset(email)


@user_router.patch("/reset-password", responses={400: {}, 404: {}})
async def reset_password(user: schemas.UserResetPassword):
    return await services.reset_password(user)


@user_router.patch("/change-password", dependencies=[Depends(check_access_token)], responses={400: {}, 401: {}})
async def change_password(user: schemas.UserChangePassword, Authorize: oauth2.AuthJWT = Depends()):
    return await services.change_password(user, Authorize)


@user_router.delete("/delete-account/", dependencies=[Depends(check_access_token)], responses={401: {}})
async def delete_account(Authorize: oauth2.AuthJWT = Depends()):
    return await services.delete_account(Authorize)
