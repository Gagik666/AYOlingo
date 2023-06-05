module.exports.createPushNotification = /* GraphQL */ `
  mutation CreatePushNotification(
    $input: CreatePushNotificationInput!
    $condition: ModelPushNotificationConditionInput
  ) {
    createPushNotification(input: $input, condition: $condition) {
      id
      title
      body
      type
      createdAt
      updatedAt
    }
  }
`;