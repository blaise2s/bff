import { Person } from 'datasources';
import { Express } from 'express';

const people: Person[] = [
  { 
    id: 1,
    firstName: 'Blaise',
    lastName: 'Schaeffer',
    email: 'b.s@gmail.com',
    friends: [2],
  },
  { 
    id: 2,
    firstName: 'Nate',
    lastName: 'Elliot',
    email: 'n.e@gmail.com',
    friends: [1],
  },
];

const addPeopleRoutes = (app: Express): void => {
  app.get('/people', (_request, response) => {
    return response.json(people);
  });
  
  app.get('/people/:id', (request, response) => {
    const { id } = request.params;
    return response.json(people.find(person => person.id === +id));
  });
}

export default addPeopleRoutes;