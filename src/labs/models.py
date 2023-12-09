from sqlalchemy import Table, Column, Integer, String, TIMESTAMP, MetaData, ForeignKey, BOOLEAN

metadata = MetaData()

lab = Table(
    "lab",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String),
    Column("description", String),
    Column("deadline", TIMESTAMP, nullable=False),
)
