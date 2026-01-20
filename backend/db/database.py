import os
from typing import Annotated
from fastapi import Depends

from sqlmodel import create_engine, SQLModel, Session

DATABASE_URL = (
    os.getenv("DATABASE_URL") or "postgresql://user:password@localhost/dbname"
)

engine = create_engine(DATABASE_URL)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]
