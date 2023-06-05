module.exports.exercisesByModule = /* GraphQL */ `
  query ExercisesByModule(
    $module: ID
    $sortDirection: ModelSortDirection
    $filter: ModelExercisesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    exercisesByModule(
      module: $module
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;