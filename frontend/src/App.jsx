import { useEffect, useState } from "react";

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

  // ---------------- EFFICIENCY TRACKER ----------------

  const completedTasks = tasks.filter(
    (task) => task.done
  ).length;

  const pendingTasks = tasks.length - completedTasks;

  const completionRate =
    tasks.length > 0
      ? Math.round((completedTasks / tasks.length) * 100)
      : 0;

  // ---------------- UI ----------------

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Productivity Dashboard
        </h1>

        {/* EFFICIENCY TRACKER */}

        <div className="grid grid-cols-3 gap-4 mb-8">

          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-gray-500">
              Total Tasks
            </h2>

            <p className="text-3xl font-bold">
              {tasks.length}
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-gray-500">
              Completed
            </h2>

            <p className="text-3xl font-bold">
              {completedTasks}
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-gray-500">
              Completion %
            </h2>

            <p className="text-3xl font-bold">
              {completionRate}%
            </p>
          </div>

        </div>

        {/* TASK SECTION */}

        <div className="bg-white p-6 rounded-xl shadow mb-8">

          <h2 className="text-2xl font-bold mb-4">
            Task Manager
          </h2>

          <div className="flex gap-2 mb-4">

            <input
              className="border p-2 rounded flex-1"
              value={taskTitle}
              onChange={(e) =>
                setTaskTitle(e.target.value)
              }
              placeholder="Enter task"
            />

            <button
              onClick={handleAddTask}
              className="bg-black text-white px-4 rounded"
            >
              Add
            </button>

          </div>

          {loading && (
            <p>Loading...</p>
          )}

          <div className="space-y-3">

            {tasks.map((task, index) => (

              <div
                key={index}
                className="bg-gray-100 p-4 rounded flex justify-between items-center"
              >

                <div className="flex gap-3 items-center">

                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() =>
                      toggleTask(index, task)
                    }
                  />

                  <span
                    className={
                      task.done
                        ? "line-through"
                        : ""
                    }
                  >
                    {task.title}
                  </span>

                </div>

                <button
                  onClick={() =>
                    handleDeleteTask(index)
                  }
                  className="text-red-500"
                >
                  Delete
                </button>

              </div>

            ))}

          </div>

        </div>

        {/* NOTES SECTION */}

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-2xl font-bold mb-4">
            Notes Manager
          </h2>

          <div className="flex gap-2 mb-4">

            <input
              className="border p-2 rounded flex-1"
              value={noteContent}
              onChange={(e) =>
                setNoteContent(e.target.value)
              }
              placeholder="Write note"
            />

            <button
              onClick={handleAddNote}
              className="bg-black text-white px-4 rounded"
            >
              Add
            </button>

          </div>

          <div className="space-y-3">

            {notes.map((note, index) => (

              <div
                key={index}
                className="bg-gray-100 p-4 rounded flex justify-between"
              >

                <span>{note.content}</span>

                <button
                  onClick={() =>
                    handleDeleteNote(index)
                  }
                  className="text-red-500"
                >
                  Delete
                </button>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default App;