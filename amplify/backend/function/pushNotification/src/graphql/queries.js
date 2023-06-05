module.exports.listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        lastName
        email
        avatar
        pushNotificationToken
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

module.exports.usersByEmail = /* GraphQL */ `
  query UsersByEmail(
    $email: String
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    usersByEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        firstName
        type
        lastName
        email
        avatar
        zipCode
        country
        state
        password
        pushNotificationToken
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;