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

module.exports.listModules = /* GraphQL */ `
query ListModules(
  $filter: ModelModuleFilterInput
  $limit: Int
  $nextToken: String
) {
  listModules(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      _languageGroup
      order
      difficulty
      duration
      image
      regression {
        start
        lastPoint
        step
      }
      position
      published
      speakerGender
      type
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;

module.exports.listProgresses = /* GraphQL */ `
query ListProgresses(
  $filter: ModelProgressFilterInput
  $limit: Int
  $nextToken: String
) {
  listProgresses(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      lastLessonCompletedDate
      dayStreakCounter
      protectionCount
      badges
      modules
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;