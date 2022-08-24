import { HTTPDataSource } from 'apollo-datasource-http';

export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  friends: number[];
}

export class PeopleApi extends HTTPDataSource {
  async getPeople(): Promise<Person[]> {
    return this.get<Person[]>('/people').then(res => res.body);
  }
  
  async getPerson(id: number): Promise<Person> {
    return this.get<Person>(`/people/${id}`).then(res => res.body);
  }
}