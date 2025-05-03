import { breakDurSignal, workDurSignal } from "../state/time";
import {
  loadBreakData,
  loadWorkData,
  saveBreakData,
  saveWorkData,
} from "./timeData";

export const saveData = () => {
  saveWorkData();
  saveBreakData();
};

export const loadData = () => {
  workDurSignal[1](parseInt(loadWorkData() ? loadWorkData()! : "0"));
  breakDurSignal[1](parseInt(loadBreakData() ? loadBreakData()! : "0"));
};
