from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# DATABASE (temporary memory)
# -------------------------

tasks = []
notes = []

# -------------------------
# MODELS
# -------------------------

class Task(BaseModel):
    title: str
    done: bool = False

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

@app.get("/tasks")
def get_tasks():
    return tasks

@app.post("/tasks")
def create_task(task: Task):
    tasks.append(task.model_dump())
    return {"message": "Task created"}

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    if task_id < len(tasks):
        tasks.pop(task_id)
        return {"message": "Task deleted"}

    return {"error": "Task not found"}

@app.put("/tasks/{task_id}")
def update_task(task_id: int, updated_task: Task):
    if task_id < len(tasks):
        tasks[task_id] = updated_task.model_dump()
        return {"message": "Task updated"}

    return {"error": "Task not found"}

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