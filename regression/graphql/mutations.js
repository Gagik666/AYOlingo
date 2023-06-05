module.exports.updateProgress = /* GraphQL */ `
  mutation UpdateProgress(
    $input: UpdateProgressInput!
    $condition: ModelProgressConditionInput
  ) {
    updateProgress(input: $input, condition: $condition) {
      id
      lastLessonCompletedDate
      dayStreakCounter
      protectionCount
      badges
      modules
      createdAt
      updatedAt
    }
  }
`;