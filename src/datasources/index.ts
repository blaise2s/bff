import { PeopleApi } from './api';
import { PostgresDb } from './db';

export type DataSources = {
  peopleApi: PeopleApi;
  postgresDb: PostgresDb;
}

export * from './api';
export * from './db';