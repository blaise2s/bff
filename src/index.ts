import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { loadSchema } from './schema';
import { resolvers } from './resolvers';

const server = new ApolloServer({ typeDefs: loadSchema(), resolvers });
const app = express();
const port = process.env.PORT || 4000;

server.start().then(() => {
  server.applyMiddleware({ app });
  app.listen({ port }, () =>
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
  );
})
