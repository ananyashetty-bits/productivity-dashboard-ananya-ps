import { useEffect, useState } from "react";

function Pomodoro() {

  // ---------------- TIMER STATES ----------------

  const [minutes, setMinutes] =
    useState(25);

  const [seconds, setSeconds] =
    useState(0);

  const [inputMinutes, setInputMinutes] =
    useState(25);

  const [isRunning, setIsRunning] =
    useState(false);

  // ---------------- TIMER ----------------

  useEffect(() => {

    let timer;

    if (isRunning) {

      timer = setInterval(() => {

        if (seconds > 0) {

          setSeconds(seconds - 1);

        }

        else {

          if (minutes === 0) {

            clearInterval(timer);

            setIsRunning(false);

            alert(
              "Pomodoro session complete!"
            );

          }

          else {

            setMinutes(minutes - 1);

            setSeconds(59);

          }

        }

      }, 1000);

    }

    return () => clearInterval(timer);

  }, [isRunning, minutes, seconds]);

  // ---------------- START TIMER ----------------

  function startCustomTimer() {

    setMinutes(inputMinutes);

    setSeconds(0);

    setIsRunning(false);

  }

  // ---------------- RESET ----------------

  function resetTimer() {

    setMinutes(inputMinutes);

    setSeconds(0);

    setIsRunning(false);

  }

  // ---------------- FORMAT ----------------

  const formattedTime = `${String(
    minutes
  ).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  return (

    <div className="min-h-[80vh] flex items-center justify-center px-4">

      <div className="bg-[#fffaf5] w-full max-w-md rounded-3xl shadow-xl p-6 md:p-10 text-center">

        {/* TITLE */}

        <h1 className="text-3xl md:text-4xl font-bold text-[#3e3028] mb-3">

          Pomodoro Timer

        </h1>

        <p className="text-gray-500 mb-8">

          Stay focused and productive

        </p>

        {/* CUSTOM INPUT */}

        <div className="mb-8">

          <label className="block mb-3 text-lg font-semibold text-[#3e3028]">

            Focus Minutes

          </label>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">

            <input
              type="number"

              min="1"

              value={inputMinutes}

              onChange={(e) =>
                setInputMinutes(
                  Number(e.target.value)
                )
              }

              className="w-40 px-4 py-3 rounded-2xl border text-center text-black"
            />

            <button
              onClick={startCustomTimer}
              className="bg-[#3e3028] text-white px-5 py-3 rounded-2xl hover:opacity-90 transition-all"
            >

              Set Timer

            </button>

          </div>

        </div>

        {/* TIMER */}

        <div className="bg-[#f5ece3] rounded-3xl py-10 px-4 mb-8">

          <h2 className="text-5xl md:text-7xl font-bold text-[#3e3028] break-all">

            {formattedTime}

          </h2>

        </div>

        {/* BUTTONS */}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">

          <button
            onClick={() =>
              setIsRunning(!isRunning)
            }
            className="bg-[#3e3028] text-white px-6 py-3 rounded-2xl hover:opacity-90 transition-all"
          >

            {isRunning
              ? "Pause"
              : "Start"}

          </button>

          <button
            onClick={resetTimer}
            className="bg-gray-300 text-[#3e3028] px-6 py-3 rounded-2xl hover:bg-gray-400 transition-all"
          >

            Reset

          </button>

        </div>

      </div>

    </div>

  );

}

export default Pomodoro;