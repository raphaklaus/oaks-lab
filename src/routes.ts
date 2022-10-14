import { graphqlHTTP } from 'express-graphql';
import { schema  } from './schemas/graphql/phases'

const root = {
  hello: () => {
    return "Working"
  }
}

export const routes = (app) => {
  app.use('/', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }));
}
