import { HTTPDataSource } from 'apollo-datasource-http';
import DataLoader from 'dataloader';

export interface Person {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  friends?: number[];
}

export class PeopleApi extends HTTPDataSource {
  async getPeople(): Promise<Person[]> {
    return this.get<Person[]>('/people').then(res => res.body);
  }
  
  async getPerson(id: number): Promise<Person> {
    return this.get<Person>(`/people/${id}`).then(res => res.body);
  }

  private personLoader = new DataLoader<number, Person>(ids => {
    return Promise.all(ids.map(id => this.getPerson(id)));
  });

  getFriend(id: number) {
    return this.personLoader.load(id);
  }

  getFriends(ids: number[]) {
    return this.personLoader.loadMany(ids);
  }

  async addPerson(firstName: string, lastName: string, email: string, friends?: number[]) {
    return this.post<Person>('/people', {
      body: {
        first_name: firstName,
        last_name: lastName,
        email,
        friends,
      }
    }).then(res => res.body);
  }
}