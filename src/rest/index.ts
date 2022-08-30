import { Express } from 'express';
import addPeopleRoutes from './people';

export const addRestRoutes = (app: Express): void => {
  addPeopleRoutes(app);

  app.get('/', (_request, response) => {
    response.json({ 
      message: 'Follow the steps in the readme to get started',
      action: 'https://github.com/blaise2s/bff#readme',
    })
  })
}