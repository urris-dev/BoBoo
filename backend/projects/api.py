from fastapi import APIRouter, Depends
from typing import List

from dependencies import check_access_token
from oauth2 import AuthJWT

from . import schemas, services

project_router = APIRouter(
    prefix="/api/projects",
    tags=["projects"],
    dependencies=[Depends(check_access_token)],
    responses={401: {}}
)

@project_router.get("/get-projects-list", response_model=List[schemas.Project])
async def get_project_list(Authorize: AuthJWT = Depends()):
    return await services.get_projects(Authorize)


@project_router.post("/create-project/", response_model=int, responses={400: {}})
async def create_project(title: str, Authorize: AuthJWT = Depends()):
    return await services.create_project(title, Authorize)


@project_router.put("/edit-project/", responses={403: {}, 404: {}})
async def edit_project(project: schemas.Project, Authorize: AuthJWT = Depends()):
    return await services.edit_project(project, Authorize)


@project_router.delete("/delete-project/", responses={403: {}, 404: {}})
async def delete_project(project_id: int, Authorize: AuthJWT = Depends()):
    return await services.delete_project(project_id, Authorize)
