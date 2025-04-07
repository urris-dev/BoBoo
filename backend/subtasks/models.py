import ormar
from typing import Optional

from database import base_ormar_config
from tasks.models import Task


class Subtask(ormar.Model):
    ormar_config = base_ormar_config.copy(tablename="subtasks")

    id: int = ormar.BigInteger(primary_key=True)
    title: str = ormar.String(nullable=False, max_length=50)
    description: Optional[str] = ormar.Text(nullable=True, server_default="")
    completion: bool = ormar.Boolean(nullable=False)
    task: Task = ormar.ForeignKey(Task, nullable=False, ondelete=ormar.ReferentialAction.CASCADE)
