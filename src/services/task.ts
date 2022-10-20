import { Phase } from "../schemas/db/phase";
import { Task, TaskAPI } from "../schemas/db/task";
import crypto from "crypto";

export const insert = (task: TaskAPI, state: Phase) => {
  const id = crypto.randomUUID();
  state.tasks.push({ ...task, id, done: false });

  return state.tasks;
};

export const get = (taskId: string, state: Phase) => {
  return state.tasks.find((x) => x.id === taskId);
};

export const update = (phase: Phase, taskRef: Task, changes: Partial<Task>) => {
  const index = phase.tasks.findIndex((task) => task.id === taskRef.id);
  phase.tasks[index] = { ...phase.tasks[index], ...changes };
  return phase.tasks;
};
