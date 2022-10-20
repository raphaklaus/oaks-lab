import { Phase } from "../schemas/db/phase";
import { Task, TaskAPI } from "../schemas/db/task";
import crypto from "crypto";

export const insert = (task: TaskAPI, state: Phase) => {
  const id = crypto.randomUUID();
  state.tasks.push({ ...task, id, done: false });

  return state;
};

export const get = (taskId: string, state: Phase) => {
  return state.tasks.find((x) => x.id === taskId);
};

export const update = (taskRef: Task, changes: Partial<Task>) => {
  return { ...taskRef, ...changes };
};
