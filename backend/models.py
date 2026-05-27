from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class TaskModel(Base):

    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String)

    done = Column(Boolean, default=False)

    type = Column(String)


class NoteModel(Base):

    __tablename__ = "notes"

    id = Column(Integer, primary_key=True, index=True)

    content = Column(String)