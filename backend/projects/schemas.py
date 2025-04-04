from pydantic import BaseModel, Field
from typing import Annotated


class Project(BaseModel):
    id: int
    title: Annotated[str, Field(max_length=50)]
