import { Phase } from "../../src/schemas/db/phase";
import {
  insert,
  get,
  isPreviousPhaseCompleted,
} from "../../src/services/phase";

test("should insert new phase into state", () => {
  let state: Phase[] = [];

  state = insert({ name: "test" }, state);

  expect(state).toHaveLength(1);
});

test("should get a phase", () => {
  let state: Phase[] = [];
  state = insert({ name: "test" }, state);

  expect(get(state[0].id, state)).toStrictEqual(state[0]);
});

test("should return false if previous phase is not completed", () => {
  let state: Phase[] = [];

  state = insert({ name: "test" }, state);
  state = insert({ name: "another one" }, state);

  expect(isPreviousPhaseCompleted(state[1], state)).toBe(false);
});

test("should return true if previous phase is completed", () => {
  let state: Phase[] = [];
  const newPhase = {
    name: "test",
  };

  state = insert({ name: "test" }, state);
  state = insert({ name: "another one" }, state);

  state[0].done = true;

  expect(isPreviousPhaseCompleted(state[1], state)).toBe(true);
});
