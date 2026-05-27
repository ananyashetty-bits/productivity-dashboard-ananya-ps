function Tasks({
  tasks,
  taskTitle,
  setTaskTitle,
  handleAddTask,
  handleDeleteTask,
  toggleTask,
}) {

  return (

    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-3xl font-bold mb-6">
        Task Tracker
      </h2>

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

        <button
          onClick={handleAddTask}
          className="bg-black text-white px-6 rounded-xl"
        >
          Add
        </button>

      </div>

      {/* TASKS */}

      <div className="space-y-4">

        {tasks
  .filter(task => task.type === "task")
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
                  toggleTask(task.id, task)
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
                handleDeleteTask(task.id)
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

export default Tasks;