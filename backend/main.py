from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Backend is running"}

@app.get("/tasks")
def get_tasks():
    return [
        {"id": 1, "title": "Study React", "done": False},
        {"id": 2, "title": "Build backend", "done": True}
    ]