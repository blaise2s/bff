import { DataSources, Person } from '../datasources';

const peopleResolverMap = {
  Query: {
    people: async (
      _parent: any,
      _args: any,
      { dataSources }: { dataSources: DataSources },
      _info: any
    ): Promise<Person[]> => {
      return dataSources.peopleApi.getPeople()
    },
    person: async (
      _parent: any,
      { id }: { id: number },
      { dataSources }: { dataSources: DataSources },
      _info: any
    ): Promise<Person> => {
      return dataSources.peopleApi.getPerson(id);
    },
  },
  Person: {
    firstName: async (
      parent: Person,
      _args: any,
      _context: any,
      _info: any
    ) => {
      return parent.first_name;
    },
    lastName: async (
      parent: Person,
      _args: any,
      _context: any,
      _info: any
    ) => {
      return parent.last_name;
    },
    friends: async (
      parent: Person,
      _args: any,
      { dataSources }: { dataSources: DataSources },
      _info: any
    ) => {
      if (parent.friends) {
        return dataSources.peopleApi.getFriends(parent.friends);
      }
    }
  },
  Mutation: {
    addPerson: async (
      _parent: any,
      args: { firstName: string, lastName: string, email: string, friends?: number[] },
      { dataSources }: { dataSources: DataSources },
      _info: any
    ) => {
      const { firstName, lastName, email, friends } = args;
      return dataSources.peopleApi.addPerson(firstName, lastName, email, friends);
    },
  },
};

export default peopleResolverMap;