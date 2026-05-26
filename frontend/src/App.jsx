import { useEffect, useState } from "react";
import { getTasks, createTask, deleteTask } from "./services/api";

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

  async function handleDeleteTask(index) {
  await deleteTask(index);
  loadTasks();
}

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">

        <h1 className="text-3xl font-bold mb-6">
          Productivity Dashboard
        </h1>

        <div className="flex gap-2 mb-6">
          <input
            className="border p-2 flex-1 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task"
          />

          <button
            onClick={handleAddTask}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>

        <div className="space-y-3">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="bg-gray-100 p-4 rounded flex justify-between"
            >
              <span>{task.title}</span>

              <button
  onClick={() => handleDeleteTask(index)}
  className="text-red-500"
>
  Delete
</button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;