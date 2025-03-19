from contextlib import asynccontextmanager
from database import base_ormar_config
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from typing import AsyncIterator

from config import settings
from users.api import user_router
from users.services import delete_outdated_not_confirmed_users


def get_lifespan(config):
    @asynccontextmanager
    async def lifespan(_: FastAPI) -> AsyncIterator[None]:
        if not config.database.is_connected:
            await config.database.connect()
            await delete_outdated_not_confirmed_users()

        yield

        if config.database.is_connected:
            await config.database.disconnect()
    return lifespan


app = FastAPI(lifespan=get_lifespan(base_ormar_config))

origins = [settings.CLIENT_ORIGIN]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.add_middleware(SessionMiddleware, secret_key=settings.SESSION_SECRET_KEY)

@app.get("/")
def home():
    return {"message": "Hello from BoBoo-FastAPI!"}

app.include_router(user_router, prefix="/api/users")
