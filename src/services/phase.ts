import { Phase } from "../schemas/db/phase";
import crypto from "crypto";

// TODO: I'd separate functions like "insert" and "get" into a Repository boundary
// And let specific things here such as the "isPreviousPhaseCompleted" function
export const insert = (phase: Partial<Phase>, state: Phase[]) => {
  const id = crypto.randomUUID();
  return [...state, { ...phase, id, tasks: [], done: false }] as Phase[];
};

export const get = (id: string, state: Phase[]) => {
  return state.find((x) => x.id === id);
};

export const isPreviousPhaseCompleted = (
  currentPhase: Phase,
  state: Phase[]
) => {
  const index = state.findIndex((phase) => phase.id === currentPhase.id);

  if (index === 0) {
    return true;
  }

  return state[index - 1].done;
};
