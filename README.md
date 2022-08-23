# BFF
A simple Apollo Express GraphQL Server

## Getting Started
1. Clone the repository: `git clone ...`
2. Move into the directory: `cd bff`
3. Install dependencies: `yarn install`
4. Start the server: `yarn dev`

### Apollo Studio Operations
```graphql
query PingQuery {
  ping
}

query UsersQuery {
  users {
    id
    firstName
  }
}

query UserFilterQuery($filter: UserFilter) {
  users(filter: $filter) {
    id
    firstName
  }
}

query UserQuery($userId: Int!) {
  user(id: $userId) {
    firstName
    lastName
  }
}

mutation AddUserMutation($firstName: String!, $lastName: String!) {
  addUser(firstName: $firstName, lastName: $lastName) {
    id
    firstName
    lastName
  }
}
```

### Apollo Studio Variables
```json
{
  "firstName": "Nick",
  "lastName": "Young",
  "userId": 1,
  "filter": {
    "ids": [1, 2],
    "search": "n"
  },
}
```