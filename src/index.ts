import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { loadSchema } from './schema';
import { resolvers } from './resolvers';
import { DataSources, PeopleApi, PostgresDb } from './datasources';
import { addRestRoutes } from './rest';
import { Knex } from 'knex';

const port = process.env.PORT || 4000;
const useSSL = process.env.DB_USE_SSL && process.env.DB_USE_SSL.toLowerCase() === 'true';

const dbConfig: Knex.Config = {
  client: process.env.DB_CLIENT || 'postgres',
  connection: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT ?  +process.env.DB_PORT :  5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'postgres',
    ssl: useSSL ? { rejectUnauthorized: false } : false,
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
  },
  introspection: !(process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod'),
});

const app = express();
app.use(express.json());
addRestRoutes(app);

server.start().then(() => {
  server.applyMiddleware({ app });
  app.listen({ port }, () =>
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
  );
})
