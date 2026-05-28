from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import sessionmaker

from database import engine
from models import Base, TaskModel, NoteModel


# -------------------------
# DATABASE SESSION
# -------------------------

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base.metadata.create_all(bind=engine)


# -------------------------
# APP
# -------------------------

app = FastAPI()


# -------------------------
# CORS
# -------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -------------------------
# MODELS
# -------------------------

class Task(BaseModel):

    title: str
    done: bool = False
    type: str = "task"
    priority: str = "Medium"
    date: str


class TaskResponse(Task):

    id: int

    class Config:
        from_attributes = True


class Note(BaseModel):

    content: str


# -------------------------
# HOME
# -------------------------

@app.get("/")
def home():

    return {
        "message": "Backend running"
    }


# -------------------------
# TASK ROUTES
# -------------------------

@app.get(
    "/tasks",
    response_model=list[TaskResponse]
)
def get_tasks():

    db = SessionLocal()

    try:

        tasks = db.query(
            TaskModel
        ).all()

        return tasks

    finally:

        db.close()


@app.post("/tasks")
def create_task(task: Task):

    db = SessionLocal()

    try:

        new_task = TaskModel(
            title=task.title,
            done=task.done,
            type=task.type,
            priority=task.priority,
            date=task.date
        )

        db.add(new_task)

        db.commit()

        db.refresh(new_task)

        return new_task

    finally:

        db.close()


@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):

    db = SessionLocal()

    try:

        task = db.query(
            TaskModel
        ).filter(
            TaskModel.id == task_id
        ).first()

        if task:

            db.delete(task)

            db.commit()

            return {
                "message": "Task deleted"
            }

        return {
            "error": "Task not found"
        }

    finally:

        db.close()


@app.put("/tasks/{task_id}")
def update_task(
    task_id: int,
    updated_task: Task
):

    db = SessionLocal()

    try:

        task = db.query(
            TaskModel
        ).filter(
            TaskModel.id == task_id
        ).first()

        if task:

            task.title = updated_task.title
            task.done = updated_task.done
            task.type = updated_task.type
            task.priority = updated_task.priority
            task.date = updated_task.date

            db.commit()

            return {
                "message": "Task updated"
            }

        return {
            "error": "Task not found"
        }

    finally:

        db.close()


# -------------------------
# NOTES ROUTES
# -------------------------

@app.get("/notes")
def get_notes():

    db = SessionLocal()

    try:

        notes = db.query(
            NoteModel
        ).all()

        return notes

    finally:

        db.close()


@app.post("/notes")
def create_note(note: Note):

    db = SessionLocal()

    try:

        new_note = NoteModel(
            content=note.content
        )

        db.add(new_note)

        db.commit()

        db.refresh(new_note)

        return new_note

    finally:

        db.close()


@app.delete("/notes/{note_id}")
def delete_note(note_id: int):

    db = SessionLocal()

    try:

        note = db.query(
            NoteModel
        ).filter(
            NoteModel.id == note_id
        ).first()

        if note:

            db.delete(note)

            db.commit()

            return {
                "message": "Note deleted"
            }

        return {
            "error": "Note not found."
        }

    finally:

        db.close()