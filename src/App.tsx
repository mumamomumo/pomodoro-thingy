import { createEffect } from "solid-js";
import "./App.css";
import GameboyButtons from "./components/GameboyButtons";
import GameboyScreen from "./components/GameboyScreen";
import { loadData } from "./data/dataManager";
import {
  breakDurSignal,
  currentTimerSignal,
  onBreakSignal,
  timerStartSignal,
  timeSignal,
  workDurSignal,
} from "./state/time";

const App = () => {
  loadData();
  const setTime = timeSignal[1];

  const [currentTimer, setCurrentTimer] = currentTimerSignal;
  const [workDur] = workDurSignal;
  const [breakDur] = breakDurSignal;
  const [onBreak, setOnBreak] = onBreakSignal;
  const [timerStart] = timerStartSignal;

  let pomodoroInterval: any;

  setCurrentTimer(workDur);
  setOnBreak(false);

  createEffect(() => {
    if (timerStart()) {
      pomodoroInterval = setInterval(() => {
        setCurrentTimer((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(pomodoroInterval);
    }
  });

  createEffect(() => {
    if (currentTimer() === 0) {
      setOnBreak((prev) => !prev);
    }
  });

  createEffect(() => {
    if (onBreak()) setCurrentTimer(breakDur());
    else setCurrentTimer(workDur());
  });

  // Update time
  setInterval(() => {
    setTime(new Date());
  }, 1000);

  return (
    <div class="gameboy">
      <svg
        viewBox="-40 -40 100 50"
        class="gameboy-part-separator"
        data-tauri-drag-region
      >
        <path
          d="M-70 -15 l125 0 l8 5 l25 0 M-45 -35 l0 20 "
          stroke="black"
          stroke-width="1"
          fill="none"
          opacity="0.5"
        />
        <circle cx="75" cy="-16" fill="gray" r="3.5" />
        <path
          d="M73 -17 L77 -15 M74 -14 L76 -18"
          stroke="#333"
          stroke-width="1"
          stroke-opacity="0.4"
        />
      </svg>
      <div class="screen-container" data-tauri-drag-region>
        <GameboyScreen />
      </div>

      <h1 class="logo">Pomodoro thing</h1>
      <GameboyButtons />
      {/* <img src="/images/Gameboy.svg" /> */}
    </div>
  );
};

export default App;
