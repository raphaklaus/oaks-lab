import { buildSchema } from 'graphql';

export const schema = buildSchema(`
  type Phase {
    id: ID,
    name: String,
    done: Boolean
  }


  type Query {
    phases(id: ID): Phase 
  }
`);
