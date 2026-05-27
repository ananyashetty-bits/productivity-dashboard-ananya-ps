import { useEffect, useState } from "react";

function Pomodoro() {

  const [minutes, setMinutes] = useState(25);

  const [timeLeft, setTimeLeft] =
    useState(25 * 60);

  const [isRunning, setIsRunning] =
    useState(false);

  // ---------------- TIMER ----------------

  useEffect(() => {

    let interval = null;

    if (isRunning) {

      interval = setInterval(() => {

        setTimeLeft((prev) => {

          if (prev <= 1) {

            clearInterval(interval);

            setIsRunning(false);

            alert("Pomodoro session complete!");

            return 0;
          }

          return prev - 1;

        });

      }, 1000);

    }

    return () => clearInterval(interval);

  }, [isRunning]);

  // ---------------- FORMAT ----------------

  const minutesDisplay =
    Math.floor(timeLeft / 60);

  const secondsDisplay =
    timeLeft % 60;

  // ---------------- START ----------------

  function startTimer() {

    setTimeLeft(minutes * 60);

    setIsRunning(true);
  }

  // ---------------- PAUSE ----------------

  function pauseTimer() {

    setIsRunning(false);
  }

  // ---------------- RESET ----------------

  function resetTimer() {

    setIsRunning(false);

    setTimeLeft(minutes * 60);
  }

  return (

    <div className="bg-[#fffaf5] p-10 rounded-3xl shadow-xl min-h-[80vh] flex flex-col justify-center">

      <h1 className="text-5xl font-bold mb-12 text-center">
        Pomodoro Timer 
      </h1>

      {/* MAIN SECTION */}

      <div className="flex items-center justify-center gap-20">

        {/* TIMER */}

        <div className="text-[120px] font-bold tracking-wide">

          {String(minutesDisplay).padStart(2, "0")}:
          {String(secondsDisplay).padStart(2, "0")}

        </div>

        {/* CONTROLS */}

        <div className="flex flex-col gap-5">

          {/* MINUTES INPUT */}

          <input
            type="number"
            value={minutes}
            onChange={(e) =>
              setMinutes(e.target.value)
            }
            className="border border-[#d6c8b8] bg-[#f5efe6] p-4 rounded-2xl w-40 text-xl"
          />

          {/* START */}

          <button
            onClick={startTimer}
            className="bg-[#3e3028] text-white px-6 py-4 rounded-2xl hover:bg-[#2c221c] transition-all duration-300"
          >
            Start
          </button>

          {/* PAUSE */}

          <button
            onClick={pauseTimer}
            className="bg-[#c8b6a6] text-[#3e3028] px-6 py-4 rounded-2xl hover:bg-[#b9a38f] transition-all duration-300"
          >
            Pause
          </button>

          {/* RESET */}

          <button
            onClick={resetTimer}
            className="bg-[#e6dccf] text-[#3e3028] px-6 py-4 rounded-2xl hover:bg-[#d6c8b8] transition-all duration-300"
          >
            Reset
          </button>

        </div>

      </div>

    </div>

  );
}

export default Pomodoro;