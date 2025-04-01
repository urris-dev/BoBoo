import ormar

from database import base_ormar_config
from users.models import User


class Project(ormar.Model):
    ormar_config = base_ormar_config.copy(tablename="projects")

    id: int = ormar.Integer(primary_key=True)
    title: str = ormar.String(nullable=False, max_length=50)
    creator: User = ormar.ForeignKey(User, nullable=False, ondelete=ormar.ReferentialAction.CASCADE)
