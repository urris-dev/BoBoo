from fastapi import APIRouter, Depends
from typing import List

from dependencies import check_access_token
from oauth2 import AuthJWT

from . import schemas, services

task_router = APIRouter(
    prefix="/api/tasks",
    tags=["tasks"],
    dependencies=[Depends(check_access_token)],
    responses={401: {}}
)

@task_router.get("/get-tasks-list/", response_model=List[schemas.Task], responses={403: {}})
async def get_tasks_list(project_id: int, Authorize: AuthJWT = Depends()):
    return await services.get_tasks(project_id, Authorize)

@task_router.post("/create-task/", response_model=int, responses={403: {}, 404: {}})
async def create_task(task: schemas.TaskCreate, Authorize: AuthJWT = Depends()):
    return await services.create_task(task, Authorize)

@task_router.put("/edit-task/", responses={403: {}, 404: {}})
async def edit_task(task: schemas.TaskEdit, Authorize: AuthJWT = Depends()):
    return await services.edit_task(task, Authorize)

@task_router.delete("/delete-task/", responses={403: {}, 404: {}})
async def delete_task(task: schemas.TaskDelete, Authorize: AuthJWT = Depends()):
    return await services.delete_task(task, Authorize)
