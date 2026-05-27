import { useState, useEffect } from "react";

function Tasks({
  tasks,
  taskTitle,
  setTaskTitle,
   priority,
  setPriority,
  handleAddTask,
  handleDeleteTask,
  toggleTask,
}) {

  // ---------------- SEARCH ----------------

  const [search, setSearch] = useState("");

  // ---------------- SORT ----------------

  const [sortType, setSortType] =
  useState(() => {

    return (
      localStorage.getItem("taskSort") ||
      "date"
    );

  });

  useEffect(() => {

  localStorage.setItem(
    "taskSort",
    sortType
  );

}, [sortType]);

  // ---------------- FILTER TASKS ----------------

  const filteredTasks = tasks.filter(
    (task) => {

      return (
        task.type === "task" &&

        task.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
      );

    }
  );

  // ---------------- SORTING ----------------

  const priorityOrder = {
    High: 1,
    Medium: 2,
    Low: 3,
  };

  const sortedTasks = [...filteredTasks]
    .sort((a, b) => {

      // completed always at bottom

      if (a.done !== b.done) {

        return a.done - b.done;

      }

      // sort by priority

      if (sortType === "priority") {

        return (
          priorityOrder[a.priority] -
          priorityOrder[b.priority]
        );

      }

      // sort by newest date

      return (
        new Date(b.date) -
        new Date(a.date)
      );

    });

  return (

    <div className="bg-[#fffaf5] rounded-3xl shadow p-6">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-3xl font-bold text-[#3e3028]">
          Task Tracker
        </h2>

        {/* SORT DROPDOWN */}

        <select
          value={sortType}
          onChange={(e) =>
            setSortType(e.target.value)
          }
          className="border p-2 rounded-xl bg-white"
        >

          <option value="date">
            Sort by Date
          </option>

          <option value="priority">
            Sort by Priority
          </option>

        </select>

      </div>

      {/* SEARCH */}

      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full p-3 rounded-xl border mb-4"
      />
{/* ADD TASK */}

<div className="flex gap-3 mb-6">

  {/* TASK INPUT */}

  <input
    type="text"
    placeholder="Enter task..."
    value={taskTitle}
    onChange={(e) =>
      setTaskTitle(e.target.value)
    }
    className="flex-1 border p-3 rounded-xl"
  />

  {/* PRIORITY SELECTOR */}

  <select
    value={priority}
    onChange={(e) =>
      setPriority(e.target.value)
    }
    className="border p-3 rounded-xl bg-white"
  >

    <option value="High">
      High
    </option>

    <option value="Medium">
      Medium
    </option>

    <option value="Low">
      Low
    </option>

  </select>

  {/* ADD BUTTON */}

  <button
    onClick={() =>
      handleAddTask(
        "task",
        priority
      )
    }
    className="bg-[#3e3028] text-white px-6 rounded-xl"
  >
    Add
  </button>

</div>

      {/* TASK LIST */}

      <div className="space-y-4">

        {sortedTasks.map((task) => (

          <div
            key={task.id}
            className={`p-4 rounded-2xl flex justify-between items-center transition-all duration-300 ${
              task.done
                ? "bg-gray-200 opacity-70"
                : "bg-white"
            }`}
          >

            {/* LEFT */}

            <div className="flex items-center gap-4">

              <input
                type="checkbox"
                checked={task.done}
                onChange={() =>
                  toggleTask(
                    task.id,
                    task
                  )
                }
              />

              <div>

                {/* TITLE */}

                <p
                  className={`font-medium ${
                    task.done
                      ? "line-through text-gray-500"
                      : "text-[#3e3028]"
                  }`}
                >
                  {task.title}
                </p>

                {/* DATE */}

                <p className="text-sm text-gray-400">

                  {task.date}

                </p>

              </div>

            </div>

            {/* RIGHT */}

            <div className="flex items-center gap-4">

              {/* PRIORITY TAG */}

              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  task.priority === "High"
                    ? "bg-red-100 text-red-600"
                    : task.priority === "Medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-600"
                }`}
              >

                {task.priority}

              </span>

              {/* DELETE */}

              <button
                onClick={() =>
                  handleDeleteTask(task.id)
                }
                className="text-red-500"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Tasks;