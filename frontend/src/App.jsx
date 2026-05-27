import { useEffect, useState } from "react";

import {
  BrowserRouter,
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

async function handleAddTask(
  type = "task",
  priority = "Medium"
) {

  if (!taskTitle) return;

  await createTask({
    title: taskTitle,
    done: false,
    type: type,
    priority: priority,
    date: new Date().toLocaleDateString(),
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

  // ---------------- UI ----------------

  return (

    
    //<BrowserRouter>
    <div className="min-h-screen bg-[#f5efe6] flex text-[#3e3028]">

      {/* SIDEBAR */}

<div className="w-60 bg-[#efe7dc] min-h-screen p-6 border-r border-[#ddd2c3]">

  <h1 className="text-2xl font-bold text-[#3e3028] mb-10">
    FocusFlow
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

        {loading ? (

          <p>Loading...</p>

        ) : (

          <Routes>

            <Route
              path="/"
              element={
                <Dashboard
                  tasks={tasks}
                  
                 
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
      path="/habits"
      element={
        <Habits
          tasks={tasks}
          handleAddTask={handleAddTask}
          handleDeleteTask={handleDeleteTask}
          toggleTask={toggleTask}
          taskTitle={taskTitle}
          setTaskTitle={setTaskTitle}
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
              <Route
  path="/pomodoro"
  element={<Pomodoro />}
/>
            

          </Routes>

        )}

      </div>

    </div>

//</BrowserRouter>
  );
}

export default App;