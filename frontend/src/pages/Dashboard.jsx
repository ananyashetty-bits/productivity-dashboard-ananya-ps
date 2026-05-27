function Analytics({ tasks }) {

  // ---------------- FILTER TASKS ----------------

  const normalTasks = tasks.filter(
    (task) => task.type === "task"
  );

  const habits = tasks.filter(
    (task) => task.type === "habit"
  );

  // ---------------- TASK ANALYTICS ----------------

  const completedTasks = normalTasks.filter(
    (task) => task.done
  ).length;

  const taskCompletionRate =
    normalTasks.length > 0
      ? Math.round(
          (
            completedTasks /
            normalTasks.length
          ) * 100
        )
      : 0;

  // ---------------- HABIT ANALYTICS ----------------

  const completedHabits = habits.filter(
    (habit) => habit.done
  ).length;

  const habitCompletionRate =
    habits.length > 0
      ? Math.round(
          (
            completedHabits /
            habits.length
          ) * 100
        )
      : 0;

  // ---------------- OVERALL PRODUCTIVITY ----------------

  const completedItems =
    completedTasks + completedHabits;

  const completionRate =
    tasks.length > 0
      ? Math.round(
          (
            completedItems /
            tasks.length
          ) * 100
        )
      : 0;

  // ---------------- PRODUCTIVITY MESSAGE ----------------

  let productivityMessage = "";

  if (completionRate >= 80) {

    productivityMessage =
      "Excellent productivity today!";

  }

  else if (completionRate >= 50) {

    productivityMessage =
      "Good progress today!";

  }

  else {

    productivityMessage =
      "Let's complete more tasks today 📈";

  }

  return (

    <div>

      {/* HEADER */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold mb-2">
          Productivity Dashboard
        </h1>

        <p className="text-gray-500">
          Track your productivity trends and habits
        </p>

      </div>

      {/* TOP CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">

        {/* TOTAL TASKS */}

        <div className="bg-white p-6 rounded-2xl shadow">

          <p className="text-gray-500">
            Total Tasks
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {normalTasks.length}
          </h2>

        </div>

        {/* TASKS COMPLETED */}

        <div className="bg-white p-6 rounded-2xl shadow">

          <p className="text-gray-500">
            Tasks Completed
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {completedTasks}
          </h2>

        </div>

        {/* HABITS COMPLETED */}

        <div className="bg-white p-6 rounded-2xl shadow">

          <p className="text-gray-500">
            Habits Completed
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {completedHabits}
          </h2>

        </div>

        {/* PRODUCTIVITY */}

        <div className="bg-white p-6 rounded-2xl shadow">

          <p className="text-gray-500">
            Productivity
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {completionRate}%
          </h2>

        </div>

        {/* DAILY HABITS */}

        <div className="bg-white p-6 rounded-2xl shadow">

          <p className="text-gray-500">
            Daily Habits
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {completedHabits}/{habits.length}
          </h2>

        </div>

      </div>

      {/* PRODUCTIVITY SECTION */}

      <div className="bg-white p-8 rounded-2xl shadow mb-8">

        <div className="flex justify-between items-center mb-4">

          <h2 className="text-2xl font-bold">
            Daily Productivity
          </h2>

          <p className="text-gray-500">
            {productivityMessage}
          </p>

        </div>

        {/* TASK PROGRESS */}

        <div className="mb-6">

          <div className="flex justify-between mb-2">

            <p className="text-gray-500">
              Task Completion
            </p>

            <p className="font-semibold">
              {taskCompletionRate}%
            </p>

          </div>

          <div className="w-full bg-gray-200 rounded-full h-5">

            <div
              className="bg-black h-5 rounded-full transition-all duration-500"
              style={{
                width: `${taskCompletionRate}%`
              }}
            />

          </div>

        </div>

        {/* HABIT PROGRESS */}

        <div>

          <div className="flex justify-between mb-2">

            <p className="text-gray-500">
              Habit Completion
            </p>

            <p className="font-semibold">
              {habitCompletionRate}%
            </p>

          </div>

          <div className="w-full bg-gray-200 rounded-full h-5">

            <div
              className="bg-green-500 h-5 rounded-full transition-all duration-500"
              style={{
                width: `${habitCompletionRate}%`
              }}
            />

          </div>

        </div>

      </div>

      {/* BOTTOM GRID */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* PRODUCTIVITY INSIGHTS */}

        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-2xl font-bold mb-6">
            Productivity Insights
          </h2>

          <div className="space-y-5">

            {/* FOCUS LEVEL */}

            <div className="bg-gray-100 p-4 rounded-xl">

              <p className="text-lg font-semibold">
                📈 Focus Level
              </p>

              <p className="text-gray-500 mt-1">

                {
                  completionRate >= 80
                    ? "High focus and consistency today."
                    : completionRate >= 50
                    ? "Decent progress with room for improvement."
                    : "Try completing a few more tasks today."
                }

              </p>

            </div>

            {/* PRODUCTIVITY GOAL */}

            <div className="bg-gray-100 p-4 rounded-xl">

              <p className="text-lg font-semibold">
                🎯 Productivity Goal
              </p>

              <p className="text-gray-500 mt-1">

                {
                  completionRate >= 100
                    ? "All productivity goals completed!"
                    : `${100 - completionRate}% remaining to reach full productivity.`
                }

              </p>

            </div>

          </div>

        </div>

        {/* WEEKLY ACTIVITY */}

        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-2xl font-bold mb-6">
            Weekly Productivity
          </h2>

          <div className="space-y-5">

            {/* MONDAY */}

            <div>

              <div className="flex justify-between mb-2">

                <p>Mon</p>
                <p>40%</p>

              </div>

              <div className="w-full bg-gray-200 rounded-full h-4">

                <div className="bg-black h-4 rounded-full w-[40%]" />

              </div>

            </div>

            {/* TUESDAY */}

            <div>

              <div className="flex justify-between mb-2">

                <p>Tue</p>
                <p>60%</p>

              </div>

              <div className="w-full bg-gray-200 rounded-full h-4">

                <div className="bg-black h-4 rounded-full w-[60%]" />

              </div>

            </div>

            {/* WEDNESDAY */}

            <div>

              <div className="flex justify-between mb-2">

                <p>Wed</p>
                <p>75%</p>

              </div>

              <div className="w-full bg-gray-200 rounded-full h-4">

                <div className="bg-black h-4 rounded-full w-[75%]" />

              </div>

            </div>

            {/* TODAY */}

            <div>

              <div className="flex justify-between mb-2">

                <p>Today</p>
                <p>{completionRate}%</p>

              </div>

              <div className="w-full bg-gray-200 rounded-full h-4">

                <div
                  className="bg-green-500 h-4 rounded-full transition-all duration-500"
                  style={{
                    width: `${completionRate}%`
                  }}
                />

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Analytics;