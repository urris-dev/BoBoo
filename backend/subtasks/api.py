from fastapi import APIRouter, Depends

from dependencies import check_access_token
from oauth2 import AuthJWT

from . import schemas, services

subtask_router = APIRouter(
    prefix="/api/subtasks",
    tags=["subtasks"],
    dependencies=[Depends(check_access_token)],
    responses={401: {}}
)

@subtask_router.post("/create-subtask/", response_model=int, responses={403: {}, 404: {}})
async def create_subtask(subtask: schemas.SubtaskCreate, Authorize: AuthJWT = Depends()):
    return await services.create_subtask(subtask, Authorize)

@subtask_router.put("/edit-subtask/", responses={403: {}, 404: {}})
async def edit_subtask(subtask: schemas.SubtaskEdit, Authorize: AuthJWT = Depends()):
    return await services.edit_subtask(subtask, Authorize)

@subtask_router.delete("/delete-subtask/", responses={403: {}, 404: {}})
async def delete_subtask(subtask: schemas.SubtaskDelete, Authorize: AuthJWT = Depends()):
    return await services.delete_subtask(subtask, Authorize)
