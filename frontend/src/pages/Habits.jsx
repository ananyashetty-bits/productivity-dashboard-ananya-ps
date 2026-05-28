function Habits({

  tasks,
  handleAddTask,
  handleDeleteTask,
  toggleTask,
  taskTitle,
  setTaskTitle,

}) {

  // ---------------- FILTER HABITS ----------------

  const habits = tasks
  .filter(
    (task) => task.type === "habit"
  )
  .sort(
    (a, b) =>
      new Date(b.date) -
      new Date(a.date)
  );

  // ---------------- UI ----------------

  return (

    <div>

      {/* HEADER */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold mb-2">
          Daily Habits
        </h1>

        <p className="text-gray-500">
          Build consistency through daily routines
        </p>

      </div>

      {/* HABIT STATS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        {/* TOTAL */}

        <div className="bg-white p-6 rounded-2xl shadow">

          <p className="text-gray-500">
            Total Habits
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {habits.length}
          </h2>

        </div>

        {/* COMPLETED */}

        <div className="bg-white p-6 rounded-2xl shadow">

          <p className="text-gray-500">
            Completed Today
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {
              habits.filter(
                (habit) => habit.done
              ).length
            }
          </h2>

        </div>

        {/* REMAINING */}

        <div className="bg-white p-6 rounded-2xl shadow">

          <p className="text-gray-500">
            Remaining
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {
              habits.length -
              habits.filter(
                (habit) => habit.done
              ).length
            }
          </h2>

        </div>

      </div>

      {/* ADD HABIT */}

      <div className="bg-white p-6 rounded-2xl shadow mb-8">

        <h2 className="text-2xl font-bold mb-6">
          Add Daily Habit
        </h2>

        <div className="flex gap-3">

          <input
            type="text"
            placeholder="Example: Exercise for 30 mins"
            value={taskTitle}
            onChange={(e) =>
              setTaskTitle(e.target.value)
            }
            className="flex-1 border p-3 rounded-xl outline-none"
          />

          <button
            onClick={() =>
              handleAddTask("habit")
            }
            className="bg-black text-white px-6 rounded-xl hover:bg-gray-800 transition"
          >
            Add
          </button>

        </div>

      </div>

      {/* HABITS LIST */}

      <div className="space-y-4">

        {habits.map((habit) => (

          <div
            key={habit.id}
            className="bg-white p-5 rounded-2xl shadow flex justify-between items-center"
          >

            {/* LEFT */}

            <div className="flex items-center gap-4">

              <input
                type="checkbox"
                checked={habit.done}
                onChange={() =>
                  toggleTask(habit.id, habit)
                }
                className="w-5 h-5"
              />

              <span
                className={`text-lg ${
                  habit.done
                    ? "line-through text-gray-400"
                    : ""
                }`}
              >
                {habit.title}
              </span>

            </div>

            {/* DELETE */}

            <button
              onClick={() =>
                handleDeleteTask(habit.id)
              }
              className="text-red-500 hover:text-red-700 transition"
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>

  );
}

export default Habits;