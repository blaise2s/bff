import isEmpty from 'lodash.isempty';

interface User {
  id: number;
  firstName: string;
  lastName: string;
}

interface UserFilter {
  ids?: number[];
  search?: string;
}

const users: User[] = [
  { id: 1, firstName: 'Blaise', lastName: 'Schaeffer' },
  { id: 2, firstName: 'Nate', lastName: 'Elliot' },
] 

const userSearchFilter = (search: string) => {
  return (user: User) => user.firstName.toLowerCase().includes(search) || user.lastName.toLowerCase().includes(search)
}

const userResolverMap = {
  Query: {
    users: (
      _parent: any,
      args: { filter: UserFilter },
      _context: any,
      _info: any
    ): User[] => {
      // No args or empty filter
      if (isEmpty(args) || isEmpty(args.filter)) {
        return users;
      }

      const { ids, search } = args.filter;
      
      // If ids passed in and not empty
      if (ids && ids.length > 0) {
        const usersById = users.filter(user => ids.includes(user.id));

        // No search string, return users by id
        if (!search) {
          return usersById;
        }

        // With search string, return filtered users by id
        return usersById.filter(userSearchFilter(search.toLowerCase()));
      }

      // No ids passed with search string, return filtered users
      if (search) {
        return users.filter(userSearchFilter(search.toLowerCase()));
      }

      // No ids or search string, also return all users
      return users;
    },
    user: (
      _parent: any,
      args: { id: number },
      _context: any,
      _info: any
    ): User | undefined => {
      return users.find(user => user.id === args.id);
    },
  },
  Mutation: {
    addUser: (
      _parent: any,
      args: { firstName: string, lastName: string },
      _context: any,
      _info: any
    ) => {
      const { firstName, lastName } = args;
      const newUser: User = { id: users.length + 1, firstName, lastName }
      users.push(newUser);
      return newUser;
    },
  },
};

export default userResolverMap;