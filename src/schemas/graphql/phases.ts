import { buildSchema } from "graphql";

export const schema = buildSchema(`
  type Phase {
    id: ID,
    name: String,
    done: Boolean,
    tasks: [Task]
  }

  type Task {
    id: ID,
    name: String,
    done: Boolean
  }

  type Query {
    phases: [Phase] 
  }
`);
