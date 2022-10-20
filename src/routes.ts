import { graphqlHTTP } from "express-graphql";
import { schema } from "./schemas/graphql/phases";
import { Application } from "express";
import { get as getPhase, insert as insertPhase } from "./services/phase";
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

export const routes = (app: Application) => {
  // TODO: Implement validation
  app.post("/phases", (req, res) => {
    state = insertPhase(req.body, state);

    return res.status(200).json({ success: true });
  });

  app.post("/phases/:id/task", (req, res) => {
    console.log(req.params.id);
    let phase = getPhase(req.params.id, state);

    if (phase) {
      phase = insertTask(req.body, phase);
      return res.status(200).json({ success: true });
    }

    return res.status(404).json({ message: "phase not found" });
  });

  app.put("/phases/:phaseId/task/:taskId/done", (req, res) => {
    let phase = getPhase(req.params.phaseId, state);

    if (!phase) {
      return res.status(404).json({ message: "phase not found" });
    }

    const task = getTask(req.params.taskId, phase);

    if (!task) {
      return res.status(404).json({ message: "task not found" });
    }

    phase = updateTask(phase, task, { done: true });

    if (phase.tasks.every((task) => task.done === true)) {
      phase.done = true;
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
