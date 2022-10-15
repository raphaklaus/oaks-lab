import { graphqlHTTP } from 'express-graphql';
import { schema  } from './schemas/graphql/phases'
import { Application } from "express"

const root = {
  hello: () => {
    return "Working"
  }
}

export const routes = (app: Application) => {
  app.use('/', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }));
}
