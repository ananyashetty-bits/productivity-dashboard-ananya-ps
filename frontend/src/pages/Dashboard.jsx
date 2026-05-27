function Analytics({
  tasks,
  completedTasks,
  completionRate,
}) {

  return (

    <div>

      <h1 className="text-4xl font-bold mb-2">
        Dashboard
      </h1>

      <p className="text-gray-500 mb-8">
        Track your productivity trends
      </p>

      <div className="bg-white p-8 rounded-2xl shadow">

        <div className="space-y-6">

          <div>

            <p className="text-gray-500 mb-2">
              Tasks Completed Today
            </p>

            <div className="w-full bg-gray-200 rounded-full h-6">

              <div
                className="bg-black h-6 rounded-full"
                style={{
                  width: `${completionRate}%`
                }}
              />

            </div>

            <p className="mt-2 font-bold">
              {completionRate}% Complete
            </p>

          </div>

          <div className="grid grid-cols-2 gap-6">

            <div className="bg-gray-100 p-6 rounded-xl">

              <p className="text-gray-500">
                Total Items
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {tasks.length}
              </h2>

            </div>

            <div className="bg-gray-100 p-6 rounded-xl">

              <p className="text-gray-500">
                Completed
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {completedTasks}
              </h2>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Analytics;