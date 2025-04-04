from fastapi import Response, HTTPException
from typing import List, Union

from oauth2 import AuthJWT
from users.models import User
from . import schemas, models


async def check_project_access(project: models.Project, Authorize: AuthJWT):
    subject = Authorize.get_jwt_subject()
    user = await User.objects.get(email=subject)

    if project.creator.id != user.id:
        raise HTTPException(status_code=403, detail="У вас нет прав на просмотр или изменение проекта с переданным идентификатором.")


async def check_project_exists(id: int) -> Union[models.Project, HTTPException]:
    try:
        project = await models.Project.objects.get(id=id)
        return project
    except:
        raise HTTPException(status_code=404, detail="Проект с переданным идентификатором не найден.")


async def get_projects(Authorize: AuthJWT) -> List[schemas.Project]:
    subject = Authorize.get_jwt_subject()
    user = await User.objects.select_related("projects").get(email=subject)
    return user.projects


async def create_project(title: str, Authorize: AuthJWT) -> Union[int, HTTPException]:
    if (len(title) > 50):
        raise HTTPException(status_code=400, detail="Название проекта не должно превышать 50 символов.")
    
    subject = Authorize.get_jwt_subject()
    user = await User.objects.get(email=subject)
    project = await models.Project.objects.create(**{"title": title, "creator": user.id})

    return project.id


async def edit_project(project: schemas.Project, Authorize: AuthJWT) -> Union[HTTPException, Response]:
    _project = await check_project_exists(project.id)    
    await check_project_access(_project, Authorize)

    _project.title = project.title
    await _project.update(["title"])
    
    return Response(status_code=200)


async def delete_project(project_id: int, Authorize: AuthJWT) -> Union[HTTPException, Response]:
    _project = await check_project_exists(project_id)  
    await check_project_access(_project, Authorize)
    
    await _project.delete()
    
    return Response(status_code=200)
