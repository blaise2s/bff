import { Person } from 'datasources';
import { Express } from 'express';

const people: Person[] = [
  { 
    id: 1,
    first_name: 'Blaise',
    last_name: 'Schaeffer',
    email: 'b.s@email.com',
    friends: [2, 3],
  },
  { 
    id: 2,
    first_name: 'John',
    last_name: 'Doe',
    email: 'j.d@email.com',
    friends: [1],
  },
  { 
    id: 3,
    first_name: 'Jane',
    last_name: 'Smith',
    email: 'j.s@email.com',
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

  app.post('/people', (request, response) => {
    const person: Person = {
      ...request.body,
      id: people.length + 1,
    };
    people.push(person);
    return response.json(person);
  })
}

export default addPeopleRoutes;