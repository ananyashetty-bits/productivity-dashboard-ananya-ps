import React from "react";
function Checklist({
  tasks,
  toggleTask,
  handleDeleteTask,
  createTask,
  loadData,
}) {

  // HABIT INPUT STATE

  const [habitTitle, setHabitTitle] =
    React.useState("");

  // ADD HABIT

  async function handleAddHabit() {

    if (!habitTitle) return;

    await createTask({
      title: habitTitle,
      done: false,
      type: "habit",
    });

    setHabitTitle("");

    loadData();
  }

  return (

    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-3xl font-bold mb-6">
        Daily Checklist
      </h2>

      {/* ADD HABIT */}

      <div className="flex gap-3 mb-6">

        <input
          type="text"
          placeholder="Add daily habit..."
          value={habitTitle}
          onChange={(e) =>
            setHabitTitle(e.target.value)
          }
          className="flex-1 border p-3 rounded-xl"
        />

        <button
          onClick={handleAddHabit}
          className="bg-black text-white px-6 rounded-xl"
        >
          Add
        </button>

      </div>

      {/* HABITS */}

      <div className="space-y-4">

        {tasks
          .filter(
            (task) => task.type === "habit"
          )
          .map((task, index) => (

            <div
              key={index}
              className="bg-gray-100 p-4 rounded-xl flex justify-between items-center"
            >

              <div className="flex items-center gap-4">

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
                      ? "line-through text-gray-400"
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

  );
}

export default Checklist;