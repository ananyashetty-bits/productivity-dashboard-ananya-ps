const API_URL = "http://127.0.0.1:8000";

export async function getTasks() {
  const response = await fetch(`${API_URL}/tasks`);
  return response.json();
}

export async function createTask(task) {
  await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
}

export async function deleteTask(taskId) {
  await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "DELETE",
  });
}