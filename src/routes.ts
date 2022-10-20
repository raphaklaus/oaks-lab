import { graphqlHTTP } from "express-graphql";
import { schema } from "./schemas/graphql/phases";
import { Application } from "express";
import {
  get as getPhase,
  insert as insertPhase,
  isPreviousPhaseCompleted,
} from "./services/phase";
import {
  insert as insertTask,
  update as updateTask,
  get as getTask,
} from "./services/task";
import { Phase } from "./schemas/db/phase";

let state: Phase[] = [];

const root = {
  phases: () => {
    return state;
  },
};

// TODO: Implement schema validation
export const routes = (app: Application) => {
  app.post("/phases", (req, res) => {
    state = insertPhase(req.body, state);

    return res.status(200).json({ success: true });
  });

  app.post("/phases/:id/task", (req, res) => {
    const phase = getPhase(req.params.id, state);

    if (!phase) {
      return res.status(404).json({ message: "phase not found" });
    }

    phase.tasks = insertTask(req.body, phase);
    phase.done = false;
    return res.status(200).json({ success: true });
  });

  app.put("/phases/:phaseId/task/:taskId/done/:status", (req, res) => {
    const status = req.params.status === "true" ? true : false;
    const phase = getPhase(req.params.phaseId, state);

    if (!phase) {
      return res.status(404).json({ message: "phase not found" });
    }

    const task = getTask(req.params.taskId, phase);

    if (!task) {
      return res.status(404).json({ message: "task not found" });
    }

    if (!isPreviousPhaseCompleted(phase, state)) {
      return res
        .status(201)
        .json({ message: "previous phase's tasks are not completed" });
    }

    phase.tasks = updateTask(phase, task, { done: status });

    if (phase.tasks.every((task) => task.done === true)) {
      phase.done = true;
    } else {
      phase.done = false;
    }

    return res.status(200).json({ success: true });
  });

  app.use(
    "/phases",
    graphqlHTTP({
      schema: schema,
      rootValue: root,
      graphiql: true,
    })
  );
};
