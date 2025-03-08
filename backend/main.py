from database import base_ormar_config
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from typing import AsyncIterator


def get_lifespan(config):
    @asynccontextmanager
    async def lifespan(_: FastAPI) -> AsyncIterator[None]:
        if not config.database.is_connected:
            await config.database.connect()

        yield

        if config.database.is_connected:
            await config.database.disconnect()
    return lifespan


app = FastAPI(lifespan=get_lifespan(base_ormar_config))

origins = ["http://localhost:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def home():
    return {"message": "Hello from BoBoo-FastAPI!"}

