import { Person } from 'datasources';
import { Express } from 'express';

const people: Person[] = [
  { 
    id: 1,
    first_name: 'Blaise',
    last_name: 'Schaeffer',
    email: 'b.s@gmail.com',
    friends: [2, 3],
  },
  { 
    id: 2,
    first_name: 'Nate',
    last_name: 'Elliot',
    email: 'n.e@gmail.com',
    friends: [1],
  },
  { 
    id: 3,
    first_name: 'Nick',
    last_name: 'Young',
    email: 'n.y@gmail.com',
    friends: [1, 2],
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