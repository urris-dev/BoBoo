from pydantic import BaseModel, Field
from typing import Annotated, Optional


class Subtask(BaseModel):
    id: int 
    title: str
    description: str
    completion: bool


class SubtaskCreate(BaseModel):
    title: Annotated[str, Field(max_length=50)]
    description: Optional[str] = ""
    completion: bool
    task: Annotated[int, Field(alias="task_id")]
    project_id: int


class SubtaskEdit(BaseModel):
    id: int
    title: Annotated[str, Field(max_length=50)]
    description: Optional[str] = ""
    completion: bool
    task_id: int
    project_id: int


class SubtaskDelete(BaseModel):
    id: int
    task_id: int
    project_id: int
