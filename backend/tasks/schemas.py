from pydantic import BaseModel, Field
from typing import Annotated, List, Optional

from subtasks.schemas import Subtask


class Task(BaseModel):
    id: int
    title: str
    description: str
    priority: str
    status: str
    subtasks: List[Subtask]


class TaskCreate(BaseModel):
    title: Annotated[str, Field(max_length=50)]
    description: Optional[str] = ""
    priority: Annotated[str, Field(max_length=6)]
    status: Annotated[str, Field(max_length=11)]
    project: Annotated[int, Field(alias="project_id")]


class TaskEdit(BaseModel):
    id: int
    title: Annotated[str, Field(max_length=50)]
    description: Optional[str] = ""
    priority: Annotated[str, Field(max_length=6)]
    status: Annotated[str, Field(max_length=11)]
    project: Annotated[int, Field(alias="project_id")]


class TaskDelete(BaseModel):
    task_id: int
    project_id: int
