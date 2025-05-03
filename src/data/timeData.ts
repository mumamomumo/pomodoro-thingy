import { breakDurSignal, workDurSignal } from "../state/time";

const workDurKey = "workDur";
const breakDurKey = "breakDur";
export const saveWorkData = (duration?: number) => {
  if (duration) {
    localStorage.setItem(workDurKey, duration.toString());
    return;
  }
  localStorage.setItem(workDurKey, workDurSignal[0]().toString());
};
export const loadWorkData = () => {
  return localStorage.getItem(workDurKey);
};

export const saveBreakData = (duration?: number) => {
  if (duration) {
    localStorage.setItem(breakDurKey, duration.toString());
    return;
  }
  localStorage.setItem(breakDurKey, breakDurSignal[0]().toString());
};
export const loadBreakData = () => {
  return localStorage.getItem(breakDurKey);
};
