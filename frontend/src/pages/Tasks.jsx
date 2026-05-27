import { useState } from "react";

function Tasks({
  tasks,
  taskTitle,
  setTaskTitle,
  handleAddTask,
  handleDeleteTask,
  toggleTask,
}) {

  // ---------------- SEARCH ----------------

  const [search, setSearch] = useState("");

  // ---------------- PRIORITY ----------------

  const [priority, setPriority] = useState("Medium");

  return (

    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-3xl font-bold mb-6">
        Task Tracker
      </h2>

      {/* SEARCH BAR */}

      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full p-3 rounded-xl border mb-6"
      />

      {/* ADD TASK */}

      <div className="flex gap-3 mb-6">

        <input
          type="text"
          placeholder="Enter task..."
          value={taskTitle}
          onChange={(e) =>
            setTaskTitle(e.target.value)
          }
          className="flex-1 border p-3 rounded-xl"
        />

        {/* PRIORITY SELECT */}

        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value)
          }
          className="border p-3 rounded-xl"
        >

          <option>Low</option>
          <option>Medium</option>
          <option>High</option>

        </select>

        <button
          onClick={() =>
            handleAddTask("task", priority)
          }
          className="bg-black text-white px-6 rounded-xl hover:bg-gray-800 transition-all"
        >
          Add
        </button>

      </div>

      {/* TASKS */}

      <div className="space-y-4">

        {tasks

          .filter(
            (task) =>
              task.type === "task" &&
              task.title
                .toLowerCase()
                .includes(search.toLowerCase())
          )

          .map((task, index) => (

            <div
              key={index}
              className="bg-gray-100 p-4 rounded-xl flex justify-between items-center hover:scale-[1.01] transition-all"
            >

              <div className="flex items-center gap-4">

                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() =>
                    toggleTask(task.id, task)
                  }
                />

                <div>

  <p
    className={
      task.done
        ? "line-through text-green-500 font-semibold"
        : ""
    }
  >
    {task.title}
  </p>

  <p className="text-xs text-gray-400 mt-1">
    Added on: {task.date}
  </p>

</div>

                {/* PRIORITY TAG */}

                <span
                  className={`px-3 py-1 rounded-full text-sm text-white

                    ${
                      task.priority === "High"
                        ? "bg-red-500"
                        : task.priority === "Medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }

                  `}
                >

                  {task.priority}

                </span>

              </div>

              <button
                onClick={() =>
                  handleDeleteTask(task.id)
                }
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>

            </div>

          ))}

      </div>

    </div>

  );
}

export default Tasks;