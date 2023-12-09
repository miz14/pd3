from datetime import datetime
from pydantic import BaseModel


class LabCreate(BaseModel):
    id: int
    name: str
    description: str
    deadline: datetime
