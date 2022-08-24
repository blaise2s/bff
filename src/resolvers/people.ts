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
};

export default peopleResolverMap;