module.exports.updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
      passedLessonsCount
      pushNotificationToken
      deletedAt
      createdAt
      updatedAt
    }
  }
`;