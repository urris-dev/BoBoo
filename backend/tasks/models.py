import ormar
from datetime import date
from typing import Optional

from database import base_ormar_config
from projects.models import Project


class Task(ormar.Model):
    ormar_config = base_ormar_config.copy(tablename="tasks")

    id: int = ormar.BigInteger(primary_key=True)
    title: str = ormar.String(nullable=False, max_length=50)
    description: Optional[str] = ormar.Text(nullable=True, server_default="")
    priority: str = ormar.String(nullable=False, max_length=6)
    deadline: date = ormar.Date(nullable=False)
    status: str = ormar.String(nullable=False, max_length=11)
    project: Project = ormar.ForeignKey(Project, nullable=False, ondelete=ormar.ReferentialAction.CASCADE)
