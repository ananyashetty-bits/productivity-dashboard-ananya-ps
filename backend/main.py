from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS CONFIGURATION
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

tasks = []

class Task(BaseModel):
    title: str
    done: bool = False

@app.get("/")
def home():
    return {"message": "Backend is running"}

@app.get("/tasks")
def get_tasks():
    return tasks

@app.post("/tasks")
def create_task(task: Task):
    tasks.append(task.dict())
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
        tasks[task_id] = updated_task.dict()
        return {"message": "Task updated"}

    return {"error": "Task not found"}