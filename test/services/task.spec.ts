import { Phase } from "../../src/schemas/db/phase";
import {
  insert as insertTask,
  get,
  update as updateTask,
} from "../../src/services/task";
import { insert as insertPhase } from "../../src/services/phase";

test("should insert task", () => {
  let phases: Phase[] = [];

  phases = insertPhase({ name: "test" }, phases);
  const task = insertTask({ name: "my task" }, phases[0]).tasks[0];

  expect(task.name).toEqual("my task");
});

test("should get task", () => {
  let phases: Phase[] = [];

  phases = insertPhase({ name: "test" }, phases);
  const task = insertTask({ name: "my task" }, phases[0]).tasks[0];

  expect(get(task.id, phases[0])).toStrictEqual(task);
});

test("should update a task", () => {
  let phases: Phase[] = [];

  phases = insertPhase({ name: "test" }, phases);
  let task = insertTask({ name: "my task" }, phases[0])[0];

  task = updateTask(phases[0], { name: "changed name" });

  expect(task.name).toEqual("changed name");
});
