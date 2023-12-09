from datetime import datetime
from pydantic import BaseModel, ConfigDict


class LabCreate(BaseModel):
    model_config: ConfigDict(from_attributes=True)
    id: int
    name: str
    description: str
    deadline: datetime
