import { createSignal, onCleanup } from "solid-js";
import { cn } from "../utils/cn";
import {
  breakDurSignal,
  currentlyEditingSignal,
  editingDurSignal,
  editingTimeSignal,
  workDurSignal,
} from "../state/time";
import { saveBreakData, saveWorkData } from "../data/timeData";

const GameboyButtons = () => {
  const [dPadDown, setDPadDown] = createSignal<
    "none" | "up" | "down" | "left" | "right" | "center"
  >("none");

  const [editingTime, setEditingTime] = editingTimeSignal;
  const [currentlyEditing, setCurrentlyEditing] = currentlyEditingSignal;
  const [editingDur, setEditingDur] = editingDurSignal;
  const [workDur, setWorkDur] = workDurSignal;
  const [breakDur, setBreakDur] = breakDurSignal;

  const saveWorkDur = () => {
    setWorkDur(editingDur());
    saveWorkData(editingDur());
  };
  const saveBreakDur = () => {
    setBreakDur(editingDur());
    saveBreakData(editingDur());
  };

  const onSelectClicked = () => {};
  const onStartClicked = () => {};

  const onAClick = () => {
    switch (editingTime()) {
      case "work":
        saveWorkDur();
        setEditingTime("break");
        setEditingDur(breakDur());
        setCurrentlyEditing("minute");
        break;
      case "break":
        saveBreakDur();
        setEditingTime("none");
        setCurrentlyEditing("none");
        break;
      case "none":
        setEditingTime("work");
        setCurrentlyEditing("hour");
        setEditingDur(workDur());
        break;
    }
  };
  const onBClick = () => {
    switch (editingTime()) {
      case "work":
        saveWorkDur();
        setEditingTime("none");
        break;
      case "break":
        saveBreakDur();
        setEditingTime("work");
        setEditingDur(workDur());
        break;
      case "none":
        break;
    }
  };

  //  DPAD
  //#region RightDPAD
  const onRightDown = () => {
    setDPadDown("right");
    switch (currentlyEditing()) {
      case "hour":
        setCurrentlyEditing("minute");
        break;
      case "minute":
        setCurrentlyEditing("second");
        break;
      case "second":
        if (editingTime() === "work") setCurrentlyEditing("hour");
        else setCurrentlyEditing("minute");
        break;
      case "none":
      default:
        break;
    }
  };
  const onRightUp = () => {
    setDPadDown("none");
  };
  //#endregion
  //#region Center DPAD
  const onCenterDown = () => {
    if (editingTime() != "none") setEditingDur(0);
    setDPadDown("center");
  };
  const onCenterUp = () => {
    setDPadDown("none");
  };
  //#endregion
  //#region Left DPAD
  const onLeftDown = () => {
    setDPadDown("left");
    switch (currentlyEditing()) {
      case "hour":
        setCurrentlyEditing("second");
        break;
      case "minute":
        if (editingTime() === "work") setCurrentlyEditing("hour");
        else setCurrentlyEditing("second");
        break;
      case "second":
        setCurrentlyEditing("minute");
        break;
      case "none":
      default:
        break;
    }
  };
  const onLeftUp = () => {
    setDPadDown("none");
  };
  //#endregion
  //#region Up DPAD
  const onUpDown = () => {
    setDPadDown("up");
    switch (currentlyEditing()) {
      case "hour":
        setEditingDur((prev) =>
          Math.floor(prev / 60 / 60) < 3 ? prev + 3600 : prev
        );
        break;
      case "minute":
        setEditingDur((prev) =>
          Math.floor(prev / 60 - Math.floor(prev / 3600) * 60) < 59
            ? prev + 60
            : prev
        );
        break;
      case "second":
        setEditingDur((prev) => prev + 1);
        break;
      case "none":
        break;
    }
  };
  const onUpUp = () => {
    setDPadDown("none");
  };
  //#endregion
  //#region Down DPAD
  const onDownDown = () => {
    setDPadDown("down");
    switch (currentlyEditing()) {
      case "hour":
        setEditingDur((prev) =>
          Math.floor(prev / 60 / 60) === 0 ? prev : prev - 3600
        );
        break;
      case "minute":
        setEditingDur((prev) =>
          Math.floor(prev / 60 - Math.floor(prev / 3600) * 60) === 0
            ? prev
            : prev - 60
        );
        break;
      case "second":
        setEditingDur((prev) => (prev % 60 === 0 ? prev : prev - 1));
        break;
      case "none":
        break;
    }
  };
  const onDownUp = () => {
    setDPadDown("none");
  };
  //#endregion

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "a") onAClick();
    else if (event.key === "b") onBClick();
    else if (event.key === " ") onSelectClicked();
    else if (event.key === "ArrowRight") onRightDown();
    else if (event.key === "ArrowLeft") onLeftDown();
    else if (event.key === "ArrowUp") onUpDown();
    else if (event.key === "ArrowDown") onDownDown();
    else {
      if (event.keyCode < 59) {
        setCurrentlyEditing("second");
        const number = event.keyCode - 48;
        setEditingDur((prev) => prev * 10);
        setEditingDur((prev) => prev + 1 * number);
      }
    }
  };
  window.addEventListener("keydown", onKeyDown);
  onCleanup(() => {
    window.removeEventListener("keydown", onKeyDown);
  });

  return (
    <div class="gameboy-buttons">
      <div class="gameboy-joypads">
        <div class={cn("gameboy-d-pad", dPadDown())}>
          <div
            class="up d-pad-button"
            onMouseDown={onUpDown}
            onMouseUp={onUpUp}
          ></div>
          <div
            class="right d-pad-button"
            onMouseDown={onRightDown}
            onMouseUp={onRightUp}
          ></div>
          <div
            class="center d-pad-button"
            onMouseDown={onCenterDown}
            onMouseUp={onCenterUp}
          ></div>
          <div
            class="down d-pad-button"
            onMouseDown={onDownDown}
            onMouseUp={onDownUp}
          ></div>
          <div
            class="left d-pad-button"
            onMouseDown={onLeftDown}
            onMouseUp={onLeftUp}
          ></div>
        </div>
        <div class="gameboy-thumb">
          <button
            class="gameboy-thumb-button gameboy-button-b"
            onClick={onBClick}
          >
            <p>B</p>
          </button>
          <button
            class="gameboy-thumb-button gameboy-button-a"
            onClick={onAClick}
          >
            <p>A</p>
          </button>
        </div>
      </div>
      <div class="gameboy-select-start">
        <button
          class="gameboy-control-button gameboy-select"
          onClick={onSelectClicked}
        >
          <p>Select</p>
        </button>
        <button
          class="gameboy-control-button gameboy-start"
          onClick={onStartClicked}
        >
          <p>Start</p>
        </button>
      </div>
    </div>
  );
};

export default GameboyButtons;
