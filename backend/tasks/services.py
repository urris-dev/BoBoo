from fastapi import Response, HTTPException
from typing import List, Union

from oauth2 import AuthJWT
from projects.models import Project
from projects.services import check_project_exists, check_project_access
from . import schemas, models


async def check_task_exists(id: int) -> Union[models.Task, HTTPException]:
    try:
        task = await models.Task.objects.get(id=id)
        return task
    except:
        raise HTTPException(status_code=404, detail="Задача с переданным идентификатором не найдена.")


async def get_tasks(project_id: int, Authorize: AuthJWT) -> List[schemas.Task]:
    project = await Project.objects.select_related("tasks").get(id=project_id)
    await check_project_access(project, Authorize)
    return project.tasks


async def create_task(task: schemas.TaskCreate, Authorize: AuthJWT) -> int:
    project = await check_project_exists(task.project.id)
    await check_project_access(project, Authorize)

    _task = await models.Task.objects.create(**task.model_dump())
    return _task.id


async def edit_task(task: schemas.TaskEdit, Authorize: AuthJWT) -> Union[HTTPException, Response]:
    project = await check_project_exists(task.project.id)
    await check_project_access(project, Authorize)

    _task = await check_task_exists(task.id)
    _task.title = task.title
    _task.description = task.description
    _task.priority = task.priority
    _task.status = task.status
    await _task.update(["title", "description", "priority", "status"])

    return Response(status_code=200)


async def delete_task(task: schemas.TaskDelete, Authorize: AuthJWT) -> Union[HTTPException, Response]:
    project = await check_project_exists(task.project_id)
    await check_project_access(project, Authorize)
    
    task = await check_task_exists(task.task_id)
    await task.delete()
    
    return Response(status_code=200)
