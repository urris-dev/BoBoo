from fastapi import Response, HTTPException
from typing import Union

from oauth2 import AuthJWT
from projects.services import check_project_exists, check_project_access
from tasks.services import check_task_exists, check_task_access
from . import schemas, models


async def check_subtask_exists(id: int) -> Union[models.Subtask, HTTPException]:
    try:
        subtask = await models.Subtask.objects.get(id=id)
        return subtask
    except:
        raise HTTPException(status_code=404, detail="Подзадача с переданным идентификатором не найдена.")


async def check_subtask_access(subtask: models.Subtask, task_id: int) -> Union[None, HTTPException]:
    if subtask.task.id != task_id:
        raise HTTPException(status_code=403, detail="У вас нет прав на изменение подзадачи с переданным идентификатором.")


async def create_subtask(subtask: schemas.SubtaskCreate, Authorize: AuthJWT) -> Union[int, HTTPException]:
    project = await check_project_exists(subtask.project_id)
    await check_project_access(project, Authorize)
    task = await check_task_exists(subtask.task)
    await check_task_access(task, subtask.project_id)

    _subtask = await models.Subtask.objects.create(**subtask.model_dump(exclude={"project_id"}))
    return _subtask.id


async def edit_subtask(subtask: schemas.SubtaskEdit, Authorize: AuthJWT) -> Union[HTTPException, Response]:
    project = await check_project_exists(subtask.project_id)
    await check_project_access(project, Authorize)
    
    task = await check_task_exists(subtask.task_id)
    await check_task_access(task, subtask.project_id)

    _subtask = await check_subtask_exists(subtask.id)
    await check_subtask_access(_subtask, subtask.task_id)
    _subtask.title = subtask.title
    _subtask.description = subtask.description
    _subtask.completion = subtask.completion
    await _subtask.update(["title", "description", "completion"])

    return Response(status_code=200)


async def delete_subtask(subtask: schemas.SubtaskDelete, Authorize: AuthJWT) -> Union[HTTPException, Response]:
    project = await check_project_exists(subtask.project_id)
    await check_project_access(project, Authorize)

    task = await check_task_exists(subtask.task_id)
    await check_task_access(task, subtask.project_id)
    
    _subtask = await check_subtask_exists(subtask.id)
    await check_subtask_access(_subtask, subtask.task_id)
    await _subtask.delete()
    
    return Response(status_code=200)
