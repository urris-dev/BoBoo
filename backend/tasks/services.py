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


async def check_task_access(task: models.Task, project_id: int) -> Union[None, HTTPException]:
    if task.project.id != project_id:
        raise HTTPException(status_code=403, detail="У вас нет прав на изменение задачи с переданным идентификатором.")
    

async def get_tasks(project_id: int, Authorize: AuthJWT) -> List[schemas.Task]:
    try:
        project = await Project.objects.select_related("tasks__subtasks").get(id=project_id)
    except:
        raise HTTPException(status_code=404, detail="Проект с переданным идентификатором не найден.")
    
    await check_project_access(project, Authorize)
    return project.tasks


async def create_task(task: schemas.TaskCreate, Authorize: AuthJWT) -> Union[int, HTTPException]:
    project = await check_project_exists(task.project)
    await check_project_access(project, Authorize)

    _task = await models.Task.objects.create(**task.model_dump())
    return _task.id


async def edit_task(task: schemas.TaskEdit, Authorize: AuthJWT) -> Union[HTTPException, Response]:
    project = await check_project_exists(task.project)
    await check_project_access(project, Authorize)

    _task = await check_task_exists(task.id)
    await check_task_access(_task, task.project)
    _task.title = task.title
    _task.description = task.description
    _task.priority = task.priority
    _task.deadline = task.deadline
    _task.status = task.status
    await _task.update(["title", "description", "priority", "deadline", "status"])

    return Response(status_code=200)


async def delete_task(task: schemas.TaskDelete, Authorize: AuthJWT) -> Union[HTTPException, Response]:
    project = await check_project_exists(task.project_id)
    await check_project_access(project, Authorize)
    
    _task = await check_task_exists(task.task_id)
    await check_task_access(_task, task.project_id)
    await _task.delete()
    
    return Response(status_code=200)
