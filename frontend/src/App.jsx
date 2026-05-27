import { useEffect, useState } from "react";

import {
  Routes,
  Route,
  Link,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Notes from "./pages/Notes";
import Tasks from "./pages/Tasks";

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
  const [taskTitle, setTaskTitle] = useState("");

  // ---------------- NOTE STATES ----------------

  const [notes, setNotes] = useState([]);
  const [noteContent, setNoteContent] = useState("");

  // ---------------- LOADING ----------------

  const [loading, setLoading] = useState(false);

  // ---------------- LOAD DATA ----------------

  async function loadData() {

    setLoading(true);

    const taskData = await getTasks();
    const noteData = await getNotes();

    setTasks(taskData);
    setNotes(noteData);

    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  // ---------------- TASK FUNCTIONS ----------------

  async function handleAddTask() {

    if (!taskTitle) return;

    await createTask({
      title: taskTitle,
      done: false,
      type: "task",
    });

    setTaskTitle("");

    loadData();
  }

  async function handleDeleteTask(index) {

    await deleteTask(index);

    loadData();
  }

  async function toggleTask(index, task) {

    await updateTask(index, {
      ...task,
      done: !task.done,
    });

    loadData();
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

  async function handleDeleteNote(index) {

    await deleteNote(index);

    loadData();
  }

  // ---------------- ANALYTICS ----------------

  const completedTasks = tasks.filter(
    (task) => task.done
  ).length;

  const completionRate =
    tasks.length > 0
      ? Math.round(
          (completedTasks / tasks.length) * 100
        )
      : 0;

  // ---------------- UI ----------------

  return (

    <div className="min-h-screen bg-gray-100 flex">

      {/* SIDEBAR */}

      <div className="w-64 bg-gradient-to-b from-black to-gray-900 text-white p-3 shadow-2xl">

        <h1 className="text-4xl font-extrabold mb-10 tracking-wide">
          Productivity Tracker
        </h1>

        <div className="space-y-4">

          <Link
            to="/"
            className="bg-gray-800 p-3 rounded-lg block"
          >
            Dashboard
          </Link>

          <Link
            to="/tasks"
            className="hover:bg-gray-800 p-3 rounded-lg block"
          >
            Tasks
          </Link>

          

          <Link
            to="/notes"
            className="hover:bg-gray-800 p-3 rounded-lg block"
          >
            Notes
          </Link>

         

        </div>

      </div>

      {/* MAIN CONTENT */}

      <div className="flex-1 p-8">

        {loading ? (

          <p>Loading...</p>

        ) : (

          <Routes>

            <Route
              path="/"
              element={
                <Dashboard
                  tasks={tasks}
                  completedTasks={completedTasks}
                  completionRate={completionRate}
                />
              }
            />

            <Route
  path="/tasks"
  element={
    <Tasks
      tasks={tasks}
      taskTitle={taskTitle}
      setTaskTitle={setTaskTitle}
      handleAddTask={handleAddTask}
      handleDeleteTask={handleDeleteTask}
      toggleTask={toggleTask}
    />
  }
/>

            
  

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

            

          </Routes>

        )}

      </div>

    </div>

  );
}

export default App;