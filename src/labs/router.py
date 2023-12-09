from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy import select, insert
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_async_session
from labs.models import lab
from labs.schemas import LabCreate
# from labs.schemas import LabsCreate

router = APIRouter(
    prefix="/labs",
    tags=["Lab"]
)


@router.get("/", response_model=List[LabCreate])
async def get_labs(lab_id: int, session: AsyncSession = Depends(get_async_session)):
    query = select(lab).where(lab.c.id == lab_id)
    result = await session.execute(query)
    return result.all()

@router.post("/")
async def add_labs(new_lab: LabCreate, session: AsyncSession = Depends(get_async_session)):
    stmt = insert(lab).values(**new_lab.dict())
    await session.execute(stmt)
    await session.commit()
    return {"status": "success"}