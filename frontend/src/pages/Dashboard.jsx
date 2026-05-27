import { useEffect, useState } from "react";

function Analytics({ tasks }) {

  const [refreshWeekly, setRefreshWeekly] =
  useState(false);

  const [productivityHistory, setProductivityHistory] =
  useState({});

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

  // ---------------- SAVE PRODUCTIVITY HISTORY ----------------

 useEffect(() => {

  const today =
    new Date().toLocaleDateString();

  const existingHistory =
    JSON.parse(
      localStorage.getItem(
        "productivityHistory"
      )
    ) || {};

  existingHistory[today] =
    completionRate;

  localStorage.setItem(
    "productivityHistory",
    JSON.stringify(existingHistory)
  );

  // update state instantly

  setProductivityHistory(
    existingHistory
  );

}, [completionRate]);



  // ---------------- GREETING ----------------

  const hour = new Date().getHours();

  let greeting = "";

  if (hour < 12) {

    greeting = "Good morning 👋";

  }

  else if (hour < 18) {

    greeting = "Good afternoon 👋";

  }

  else {

    greeting = "Good evening 👋";

  }

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

  // ---------------- PRODUCTIVITY HISTORY ----------------

  

  const weekDays = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  const today = new Date();

  const weeklyData = weekDays.map(
    (day, index) => {

      const currentDate = new Date();

      currentDate.setDate(
        today.getDate() -
        today.getDay() +
        index
      );

      const formattedDate =
        currentDate.toLocaleDateString();

      return {

        day,

        productivity:
          productivityHistory[
            formattedDate
          ] || 0,

      };

    }
  );

  // ---------------- STREAK ----------------

  const historyValues =
    Object.values(productivityHistory);

const streakDays =
  historyValues.filter(
    (value) => value > 0
  ).length;

  // ---------------- DATE ----------------

  const currentDate =
    new Date().toDateString();

  return (

    <div className="space-y-8">

      {/* HEADER */}

      <div className="bg-[#fffaf5] rounded-3xl shadow p-7 mb-8 text-center">

  <h1 className="text-5xl font-extrabold tracking-wide text-[#3e3028] mb-4">

     FocusFlow

  </h1>

  <h2 className="text-2xl text-[#6b5448] mb-2">

    {" "+greeting}

  </h2>

  <p className="text-gray-500 text-lg">

    {new Date().toDateString()}

  </p>

</div>

      {/* TOP CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

        {/* TOTAL TASKS */}

        <div className="bg-[#fffaf5] p-6 rounded-2xl shadow">

          <p className="text-gray-500">
            Total Tasks
          </p>

          <h2 className="text-4xl font-bold mt-2 text-[#3e3028]">
            {normalTasks.length}
          </h2>

        </div>

        {/* TASKS COMPLETED */}

        <div className="bg-[#fffaf5] p-6 rounded-2xl shadow">

          <p className="text-gray-500">
            Tasks Completed
          </p>

          <h2 className="text-4xl font-bold mt-2 text-[#3e3028]">
            {completedTasks}
          </h2>

        </div>

        {/* HABITS COMPLETED */}

        <div className="bg-[#fffaf5] p-6 rounded-2xl shadow">

          <p className="text-gray-500">
            Habits Completed
          </p>

          <h2 className="text-4xl font-bold mt-2 text-[#3e3028]">
            {completedHabits}
          </h2>

        </div>

        {/* STREAK */}

        <div className="bg-[#fffaf5] p-6 rounded-2xl shadow">

          <p className="text-gray-500">
            Current Streak
          </p>

          <h2 className="text-4xl font-bold mt-2 text-[#3e3028]">
            🔥 {streakDays}
          </h2>

        </div>

        {/* PRODUCTIVITY */}

        <div className="bg-[#fffaf5] p-6 rounded-2xl shadow">

          <p className="text-gray-500">
            Productivity
          </p>

          <h2 className="text-4xl font-bold mt-2 text-[#3e3028]">
            {completionRate}%
          </h2>

        </div>

      </div>

      {/* PRODUCTIVITY SECTION */}

      <div className="bg-[#fffaf5] p-8 rounded-3xl shadow">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold text-[#3e3028]">
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
              className="bg-[#3e3028] h-5 rounded-full transition-all duration-500"
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

        <div className="bg-[#fffaf5] p-6 rounded-3xl shadow">

          <h2 className="text-2xl font-bold mb-6 text-[#3e3028]">
            Productivity Insights
          </h2>

          <div className="space-y-5">

            {/* FOCUS */}

            <div className="bg-[#f5ece3] p-4 rounded-xl">

              <p className="text-lg font-semibold">
                📈 Focus Level
              </p>

              <p className="text-gray-600 mt-1">

                {
                  completionRate >= 80
                    ? "High focus and consistency today."
                    : completionRate >= 50
                    ? "Decent progress with room for improvement."
                    : "Try completing a few more tasks today."
                }

              </p>

            </div>

            {/* GOAL */}

            <div className="bg-[#f5ece3] p-4 rounded-xl">

              <p className="text-lg font-semibold">
                🎯 Productivity Goal
              </p>

              <p className="text-gray-600 mt-1">

                {
                  completionRate >= 100
                    ? "All productivity goals completed!"
                    : `${100 - completionRate}% remaining to reach full productivity.`
                }

              </p>

            </div>

            {/* SUMMARY */}

            <div className="bg-[#f5ece3] p-4 rounded-xl">

              <p className="text-lg font-semibold">
                ✅ Today's Summary
              </p>

              <p className="text-gray-600 mt-1">

                You completed {completedTasks} tasks and {completedHabits} habits today.

              </p>

            </div>

          </div>

        </div>

        {/* WEEKLY PRODUCTIVITY */}

        <div className="bg-[#fffaf5] p-6 rounded-3xl shadow">

          <h2 className="text-2xl font-bold mb-6 text-[#3e3028]">
            Weekly Productivity
          </h2>

          <div className="space-y-5">

            {weeklyData.map((item, index) => (

              <div key={index}>

                <div className="flex justify-between mb-2">

                  <p>{item.day}</p>

                  <p>{item.productivity}%</p>

                </div>

                <div className="w-full bg-gray-200 rounded-full h-4">

                  <div
                    className="bg-[#3e3028] h-4 rounded-full transition-all duration-500"
                    style={{
                      width: `${item.productivity}%`
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  );

}

export default Analytics;