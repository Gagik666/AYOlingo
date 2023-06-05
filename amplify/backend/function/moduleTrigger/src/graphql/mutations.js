module.exports.deleteExercises = /* GraphQL */ `
mutation DeleteExercises(
  $input: DeleteExercisesInput!
  $condition: ModelExercisesConditionInput
) {
  deleteExercises(input: $input, condition: $condition) {
    id
    _module
    module
    search
    _languageGroup
    published
    lessonsCount
    createdAt
    updatedAt
  }
}
`;