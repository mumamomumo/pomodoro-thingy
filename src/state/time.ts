import { createSignal } from "solid-js";

export const timeSignal = createSignal(new Date());
export const workDurSignal = createSignal(540);
export const breakDurSignal = createSignal(0);
export const editingDurSignal = createSignal(0);
export const editingTimeSignal = createSignal<"work" | "break" | "none">(
  "none"
);
export const currentlyEditingSignal = createSignal<
  "hour" | "minute" | "second" | "none"
>("none");
