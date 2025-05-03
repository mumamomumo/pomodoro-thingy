import { createSignal } from "solid-js";

export const timeSignal = createSignal(new Date());
export const workDurSignal = createSignal(0);
export const breakDurSignal = createSignal(0);
export const editingDurSignal = createSignal(20);
export const editingTimeSignal = createSignal<"work" | "break" | "none">(
  "none"
);
export const currentlyEditingSignal = createSignal<
  "hour" | "minute" | "second" | "none"
>("none");

// Pomodoro part
export const currentTimerSignal = createSignal(0);
export const timerStartSignal = createSignal(false);
export const onBreakSignal = createSignal(false);
