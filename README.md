# BFF
A fairly simple Apollo Express GraphQL Server

## Getting Started
1. Clone the repository: `git clone ...`
2. Move into the directory: `cd bff`
3. Install dependencies: `yarn install`
4. Download [Docker](https://docs.docker.com/get-docker/) if you don't have it already
5. Start docker: `docker-compose up`
6. In another tab start the server: `yarn dev`

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
    lastName
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

query PeopleQuery {
  people {
    id
    firstName
    lastName
    email
    friends {
      firstName
    }
  }
}

query PersonQuery($personId: Int!) {
  person(id: $personId) {
    id
    firstName
    lastName
    email
    friends {
      firstName
    }
  }
}

mutation AddPersonMutation($addPersonFirstName: String!, $addPersonLastName: String!, $addPersonEmail: String!, $addPersonFriends: [Int!]) {
  addPerson(firstName: $addPersonFirstName, lastName: $addPersonLastName, email: $addPersonEmail, friends: $addPersonFriends) {
    id
    firstName
    lastName
    email
    friends {
      firstName
    }
  }
}

query ProductsQuery {
  products {
    id
    name
  }
}

query ProductQuery($productId: Int!) {
  product(id: $productId) {
    name
    description
  }
}

mutation AddProductMutation($addProductId: Int!, $name: String!) {
  addProduct(id: $addProductId, name: $name) {
    id
    name
  }
}
```

### Apollo Studio Variables
```json
{
  "firstName": "Rebel",
  "lastName": "Wilson",
  "userId": 1,
  "filter": {
    "ids": [1, 2],
    "search": "o"
  },
  "personId": 1,
  "productId": 1,
  "addProductId": 3,
  "name": "Moxe GQL Connect",
  "addPersonFirstName": "Isaac",
  "addPersonLastName": "Newton",
  "addPersonEmail": "i.n@email.com",
  "addPersonFriends": [1, 2, 3]
}
```

## Play around in the deployed app
1. Download [Postman](https://www.postman.com/downloads/) if you don't have it already
2. Import the [Moxe GQL POC Postman Collection](postman/Moxe-GQL-POC.postman_collection.json) into Postman
3. Uncomment the query or mutation you'd like to run and have some fun!