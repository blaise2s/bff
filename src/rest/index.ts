import { Express } from 'express';
import addPeopleRoutes from './people';

export const addRestRoutes = (app: Express): void => {
  addPeopleRoutes(app);
}