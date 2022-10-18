import { graphqlHTTP } from 'express-graphql';
import { schema  } from './schemas/graphql/phases'
import { Application } from "express"
import { get } from './services/phase'

const root = {
  phases: (query) => {
    console.log(query)
    return get()
  }
}

export const routes = (app: Application) => {
  app.use('/', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }));
  
  app.post("/", (req, res) => {

      })
}
