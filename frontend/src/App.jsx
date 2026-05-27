import { useEffect, useState } from "react";

import {
  Routes,
  Route,
  Link,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Notes from "./pages/Notes";
import Tasks from "./pages/Tasks";
import Habits from "./pages/Habits";
import Pomodoro from "./pages/Pomodoro";

import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,

  getNotes,
  createNote,
  deleteNote,

} from "./services/api";

function App() {

  // ---------------- TASK STATES ----------------

  const [tasks, setTasks] = useState([]);

  const [taskTitle, setTaskTitle] =
    useState("");

  const [priority, setPriority] =
    useState("Medium");

  // ---------------- NOTE STATES ----------------

  const [notes, setNotes] = useState([]);

  const [noteContent, setNoteContent] =
    useState("");

  // ---------------- LOADING ----------------

  const [loading, setLoading] =
    useState(false);
  const [error, setError] = useState("");

  // ---------------- LOAD DATA ----------------

  async function loadData() {

  try {

    setLoading(true);

    setError("");

    const taskData = await getTasks();

    const noteData = await getNotes();

    setTasks(taskData);

    setNotes(noteData);

  }

  catch (error) {

    console.log(error);

    setError(
      "Failed to load data."
    );

  }

  finally {

    setLoading(false);

  }

}

  useEffect(() => {

    loadData();

  }, []);

  // ---------------- TASK FUNCTIONS ----------------

 async function handleAddTask(
  type = "task",
  priority = "Medium"
) {

  if (!taskTitle) return;

  try {

    setError("");

    await createTask({

      title: taskTitle,

      done: false,

      type: type,

      priority: priority,

      date:
        new Date().toLocaleDateString(),

    });

    setTaskTitle("");

    loadData();

  }

  catch (error) {

    console.log(error);

    setError(
      "Failed to add task."
    );

  }

}

  async function handleDeleteTask(id) {

  try {

    setError("");

    await deleteTask(id);

    loadData();

  }

  catch (error) {

    console.log(error);

    setError(
      "Failed to delete task."
    );

  }

}

 async function toggleTask(id, task) {

  try {

    setError("");

    await updateTask(id, {

      ...task,

      done: !task.done,

    });

    loadData();

  }

  catch (error) {

    console.log(error);

    setError(
      "Failed to update task."
    );

  }

}

  // ---------------- NOTE FUNCTIONS ----------------

  async function handleAddNote() {

    if (!noteContent) return;

    await createNote({
      content: noteContent,
    });

    setNoteContent("");

    loadData();

  }

  async function handleDeleteNote(id) {

    await deleteNote(id);

    loadData();

  }

  // ---------------- UI ----------------

  return (

    <div className="min-h-screen bg-[#f5efe6] flex text-[#3e3028]">

      {/* SIDEBAR */}

      <div className="w-60 bg-[#efe7dc] min-h-screen p-6 border-r border-[#ddd2c3]">

        <h1 className="text-3xl font-bold mb-10">
          Productivity Dashboard
        </h1>

        <div className="flex flex-col gap-3">

          <Link
            to="/"
            className="px-4 py-3 rounded-xl hover:bg-[#e2d6c7] transition-all"
          >
            Dashboard
          </Link>

          <Link
            to="/tasks"
            className="px-4 py-3 rounded-xl hover:bg-[#e2d6c7] transition-all"
          >
            Tasks
          </Link>

          <Link
            to="/habits"
            className="px-4 py-3 rounded-xl hover:bg-[#e2d6c7] transition-all"
          >
            Daily Habits
          </Link>

          <Link
            to="/notes"
            className="px-4 py-3 rounded-xl hover:bg-[#e2d6c7] transition-all"
          >
            Notes
          </Link>

          <Link
            to="/pomodoro"
            className="px-4 py-3 rounded-xl hover:bg-[#e2d6c7] transition-all"
          >
            Pomodoro
          </Link>

        </div>

      </div>

      {/* MAIN CONTENT */}

      <div className="flex-1 p-8">

        {error && (

  <div className="bg-red-100 text-red-600 p-4 rounded-xl mb-6">

    {error}

  </div>

)}

        {loading ? (

          <p className="text-xl">
            Loading...
          </p>

        ) : (

          <Routes>

            {/* DASHBOARD */}

            <Route
              path="/"
              element={
                <Dashboard
                  tasks={tasks}
                />
              }
            />

            {/* TASKS */}

            <Route
              path="/tasks"
              element={
                <Tasks
                  tasks={tasks}

                  taskTitle={taskTitle}
                  setTaskTitle={setTaskTitle}

                  priority={priority}
                  setPriority={setPriority}

                  handleAddTask={handleAddTask}
                  handleDeleteTask={handleDeleteTask}
                  toggleTask={toggleTask}
                />
              }
            />

            {/* HABITS */}

            <Route
              path="/habits"
              element={
                <Habits
                  tasks={tasks}

                  taskTitle={taskTitle}
                  setTaskTitle={setTaskTitle}

                  handleAddTask={handleAddTask}
                  handleDeleteTask={handleDeleteTask}
                  toggleTask={toggleTask}
                />
              }
            />

            {/* NOTES */}

            <Route
              path="/notes"
              element={
                <Notes
                  notes={notes}

                  noteContent={noteContent}
                  setNoteContent={setNoteContent}

                  handleAddNote={handleAddNote}
                  handleDeleteNote={handleDeleteNote}
                />
              }
            />

            {/* POMODORO */}

            <Route
              path="/pomodoro"
              element={
                <Pomodoro />
              }
            />

          </Routes>

        )}

      </div>

    </div>

  );

}

export default App;