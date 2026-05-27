const API_URL ="https://productivity-dashboard-ananya-ps.onrender.com";

// ---------------- TASKS ----------------

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

export async function updateTask(taskId, updatedTask) {
  await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedTask),
  });
}

// ---------------- NOTES ----------------

export async function getNotes() {
  const response = await fetch(`${API_URL}/notes`);
  return response.json();
}

export async function createNote(note) {
  await fetch(`${API_URL}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
}

export async function deleteNote(noteId) {
  await fetch(`${API_URL}/notes/${noteId}`, {
    method: "DELETE",
  });
}