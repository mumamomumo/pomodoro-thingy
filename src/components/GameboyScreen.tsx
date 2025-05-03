import {
  breakDurSignal,
  currentlyEditingSignal,
  currentTimerSignal,
  editingDurSignal,
  editingTimeSignal,
  onBreakSignal,
  timerStartSignal,
  timeSignal,
  workDurSignal,
} from "../state/time";
import { breakTimeSignal, keyboardSignal, timerOnSignal } from "../state/bulbs";
import { cn } from "../utils/cn";
import { formatTime } from "../utils/formatTime";
import { createEffect, Match, Switch } from "solid-js";

const GameboyScreen = () => {
  const [currentDate] = timeSignal;
  const [keyboardOn, setKeyobardOn] = keyboardSignal;
  const [onBreakBulb, setBreakBulb] = breakTimeSignal;
  const [timerBulb, setTimerBulb] = timerOnSignal;
  const [workDur] = workDurSignal;
  const [breakDur] = breakDurSignal;

  const [currentlyEditing] = currentlyEditingSignal;
  const [editingTime] = editingTimeSignal;
  const [editingDur] = editingDurSignal;

  const [onBreak] = onBreakSignal;
  const [timerOn] = timerStartSignal;
  const currentTimer = currentTimerSignal[0];

  createEffect(() => {
    if (editingTime() != "none") setKeyobardOn(true);
    else setKeyobardOn(false);
  });

  createEffect(() => setBreakBulb(onBreak()));
  createEffect(() => setTimerBulb(timerOn()));

  return (
    <div class="gameboy-screen">
      <div class="gameboy-bulbs">
        <button class="gameboy-power gameboy-bulb active">
          <p>Battery</p>
        </button>
        <button
          class={cn(
            "gameboy-keyboard gameboy-bulb",
            keyboardOn() ? "active" : "inactive"
          )}
        >
          <p>Keyboard</p>
        </button>
        <button
          class={cn(
            "gameboy-break gameboy-bulb",
            onBreakBulb() ? "active" : "inactive"
          )}
        >
          <p>On break</p>
        </button>
        <button
          class={cn(
            "gameboy-timer gameboy-bulb",
            timerBulb() ? "active" : "inactive"
          )}
        >
          <p>Timer on</p>
        </button>
      </div>
      <div class="screen-display">
        <div class="gameboy-screen-topbar">
          <div class="side-1 side">
            {(editingTime() === "none" && workDur() >= 5400) ||
            editingDur() >= 5400
              ? "!!!"
              : ""}
          </div>
          <div class="side-2 side">
            <p>{currentDate().toLocaleTimeString()}</p>
          </div>
        </div>
        {/* Main screen. Time */}
        <div class="gameboy-screen-main">
          <Switch>
            {/* When editing time */}
            <Match when={editingTime() != "none"}>
              <p class="time">
                {/* Hour */}
                {editingTime() === "work" && (
                  <span
                    class={cn(
                      "hour",
                      currentlyEditing() === "hour" ? "editing" : ""
                    )}
                  >
                    {formatTime(editingDur()).split(" ")[0]}
                  </span>
                )}{" "}
                {/* Minute */}
                <span
                  class={cn(
                    "minute",
                    currentlyEditing() === "minute" ? "editing" : ""
                  )}
                >
                  {formatTime(editingDur()).split(" ")[1]}
                </span>{" "}
                {/* Second */}
                <span
                  class={cn(
                    "second",
                    currentlyEditing() === "second" ? "editing" : ""
                  )}
                >
                  {formatTime(editingDur()).split(" ")[2]}
                </span>
              </p>
            </Match>
            {/* When not editing */}
            <Match when={editingTime() == "none"}>
              <p class="time">
                <span class="work">
                  {formatTime(currentTimer(), onBreak() ? 2 : 3)}
                </span>{" "}
                <br />
                <span class="break">
                  {!onBreak()
                    ? formatTime(breakDur(), 2)
                    : formatTime(workDur())}
                </span>
              </p>
            </Match>
          </Switch>
        </div>
        {/* Controls indicator */}
        <div class="gameboy-screen-bottombar">
          <Switch>
            {/* Not editing anything currently */}
            <Match when={editingTime() === "none" && !timerOn()}>
              <p>
                <span class="button">A</span> Edit time
              </p>
              <p>
                <span class="button">
                  <img src="/images/circle.svg" width={10} />
                </span>{" "}
                Reset time
              </p>
            </Match>
            {/* Editing working time */}
            <Match when={editingTime() === "work"}>
              <p>
                <span class="button">A</span> Edit Break
              </p>
              <p>
                <span class="button">
                  <img src="/images/circle.svg" width={10} />
                </span>{" "}
                Reset
              </p>
              <p>
                <span class="button">B</span> Finish
              </p>
            </Match>
            {/* Editing break time */}
            <Match when={editingTime() === "break"}>
              <p>
                <span class="button">A</span> Finish
              </p>
              <p>
                <span class="button">
                  <img src="/images/circle.svg" width={10} />
                </span>{" "}
                Reset
              </p>
              <p>
                <span class="button">B</span> Edit work time
              </p>
            </Match>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default GameboyScreen;
