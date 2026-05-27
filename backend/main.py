from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import sessionmaker
from database import engine
from models import Base, TaskModel, NoteModel
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "http://localhost:5174",
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# DATABASE (temporary memory)
# -------------------------

notes = []

# -------------------------
# MODELS
# -------------------------

class Task(BaseModel):
    title: str
    done: bool = False
    type: str
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
    return {"message": "Backend running"}

# -------------------------
# TASK ROUTES
# -------------------------

@app.get("/tasks", response_model=list[TaskResponse])
def get_tasks():

    db = SessionLocal()

    tasks = db.query(TaskModel).all()

    return tasks

@app.post("/tasks", response_model=TaskResponse)
def create_task(task: Task):

    db = SessionLocal()

    new_task = TaskModel(
        title=task.title,
        done=task.done,
        type=task.type,
    )

    db.add(new_task)

    db.commit()

    db.refresh(new_task)

    return new_task

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):

    db = SessionLocal()

    task = db.query(TaskModel).filter(
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

@app.put("/tasks/{task_id}")
def update_task(task_id: int, updated_task: Task):

    db = SessionLocal()

    task = db.query(TaskModel).filter(
        TaskModel.id == task_id
    ).first()

    if task:

        task.title = updated_task.title
        task.done = updated_task.done
        task.type = updated_task.type

        db.commit()

        return {
            "message": "Task updated"
        }

    return {
        "error": "Task not found"
    }

# -------------------------
# NOTES ROUTES
# -------------------------

@app.get("/notes")
def get_notes():
    return notes

@app.post("/notes")
def create_note(note: Note):
    notes.append(note.model_dump())
    return {"message": "Note created"}

@app.delete("/notes/{note_id}")
def delete_note(note_id: int):
    if note_id < len(notes):
        notes.pop(note_id)
        return {"message": "Note deleted"}

    return {"error": "Note not found"}