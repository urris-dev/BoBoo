from datetime import date
from pydantic import BaseModel, Field, field_validator
from typing import Annotated, List, Optional

from subtasks.schemas import Subtask


class Task(BaseModel):
    id: int
    title: str
    description: str
    priority: str
    deadline: date
    status: str
    subtasks: List[Subtask]


class TaskCreate(BaseModel):
    title: Annotated[str, Field(max_length=50)]
    description: Optional[str] = ""
    priority: Annotated[str, Field(max_length=6)]
    deadline: date
    status: Annotated[str, Field(max_length=11)]
    project: Annotated[int, Field(alias="project_id")]

    @field_validator("deadline", mode="after")
    def validate_deadline(cls, value: date):
        if value <= date.today():
            raise ValueError("Дедлайн задачи не может быть раньше завтрашнего дня.")
        return value


class TaskEdit(BaseModel):
    id: int
    title: Annotated[str, Field(max_length=50)]
    description: Optional[str] = ""
    priority: Annotated[str, Field(max_length=6)]
    deadline: date
    status: Annotated[str, Field(max_length=11)]
    project: Annotated[int, Field(alias="project_id")]

    @field_validator("deadline", mode="after")
    def validate_deadline(cls, value: date):
        if value <= date.today():
            raise ValueError("Дедлайн задачи не может быть раньше завтрашнего дня.")
        return value


class TaskDelete(BaseModel):
    task_id: int
    project_id: int
