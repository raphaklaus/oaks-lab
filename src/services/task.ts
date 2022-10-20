import { Phase } from "../schemas/db/phase";
import { Task } from "../schemas/db/task";
import crypto from "crypto";

export const insert = (task: Task, state: Phase) => {
  const id = crypto.randomUUID();
  state.tasks.push({ ...task, id, done: false });

  return state;
};

export const get = (taskId: string, state: Phase) => {
  return state.tasks.find((x) => x.id === taskId);
};

export const update = (phase: Phase, taskRef: Task, changes: Partial<Task>) => {
  const index = phase.tasks.findIndex((task) => task.id === taskRef.id);
  phase.tasks[index] = { ...taskRef, ...changes };
  return phase;
};
