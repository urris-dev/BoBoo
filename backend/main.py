from aiocron import crontab
from contextlib import asynccontextmanager
from database import base_ormar_config
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from typing import AsyncIterator

from config import settings
from users.api import user_router
from projects.api import project_router
from users.services import delete_outdated_not_confirmed_users

from projects.models import Project
from users.models import User

def get_lifespan(config):
    @asynccontextmanager
    async def lifespan(_: FastAPI) -> AsyncIterator[None]:
        if not config.database.is_connected:
            await config.database.connect()

        yield

        if config.database.is_connected:
            await config.database.disconnect()
    return lifespan

crontab("1 3 * * *", func=delete_outdated_not_confirmed_users)

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

app.include_router(user_router)
app.include_router(project_router)
