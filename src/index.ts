import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { loadSchema } from './schema';
import { resolvers } from './resolvers';
import { DataSources, PeopleApi } from './datasources';
import { addRestRoutes } from './rest';

const port = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs: loadSchema(),
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  dataSources: (): DataSources => {
    return {
      peopleApi: new PeopleApi(`http://localhost:${port}`),
    }
  }
});

const app = express();
addRestRoutes(app);

server.start().then(() => {
  server.applyMiddleware({ app });
  app.listen({ port }, () =>
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
  );
})
