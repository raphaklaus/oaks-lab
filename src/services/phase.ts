import { Phase } from "../schemas/db/phase";
import crypto from "crypto";

export const insert = (phase: Phase, state: Phase[]) => {
  const id = crypto.randomUUID();
  return [...state, { ...phase, id, tasks: [] }];
};

export const get = (id: string, state: Phase[]) => {
  return state.find((x) => x.id === id);
};
