import { useEffect, useState } from "react";
import { getTasks, createTask } from "./services/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  async function loadTasks() {
    const data = await getTasks();
    setTasks(data);
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleAddTask() {
    if (!title) return;

    await createTask({
      title,
      done: false,
    });

    setTitle("");
    loadTasks();
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Productivity Dashboard</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
      />

      <button onClick={handleAddTask}>
        Add Task
      </button>

      <hr />

      {tasks.map((task, index) => (
        <div key={index}>
          {task.title}
        </div>
      ))}
    </div>
  );
}

export default App;