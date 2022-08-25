import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { loadSchema } from './schema';
import { resolvers } from './resolvers';
import { DataSources, PeopleApi, PostgresDb } from './datasources';
import { addRestRoutes } from './rest';
import { Knex } from 'knex';

const port = process.env.PORT || 4000;

const dbConfig: Knex.Config = {
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'postgres',
  },
  searchPath: ['public'],
}

const server = new ApolloServer({
  typeDefs: loadSchema(),
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  dataSources: (): DataSources => {
    return {
      peopleApi: new PeopleApi(`http://localhost:${port}`),
      postgresDb: new PostgresDb(dbConfig),
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
