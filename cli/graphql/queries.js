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
      deletedAt
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

module.exports.listExercises = /* GraphQL */ `
  query ListExercises(
    $filter: ModelExercisesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listExercises(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        _module
        module
        search
        _languageGroup
        published
        lessonsCount
        lessons {
          exercises {
            type
            quiz {
              question {
                id
                transliteration
                audio
              }
              answers {
                value {
                  id
                  transliteration
                  audio
                }
                selected
                right
                image
              }
            }
          }
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

module.exports.listVocabularies = /* GraphQL */ `
query ListVocabularies(
  $filter: ModelVocabularyFilterInput
  $limit: Int
  $nextToken: String
) {
  listVocabularies(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      _languageGroup
      valueFrom
      transliterationFrom
      audioFrom
      alphabetLetterFrom
      alphabetIndexFrom
      valueTo
      transliterationTo
      audioTo
      alphabetLetterTo
      alphabetIndexTo
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;

module.exports.listAudio = /* GraphQL */ `
query ListAudio(
  $filter: ModelAudioFilterInput
  $limit: Int
  $nextToken: String
) {
  listAudio(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      file
      gender
      type
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;

module.exports.listFeedbacks = /* GraphQL */ `
  query ListFeedbacks(
    $filter: ModelFeedbackFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFeedbacks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        device {
          brand
          osVersion
          modelName
        }
        _module
        _exercise
        lesson
        exercise
        user {
          email
          name
          id
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

module.exports.listPushNotifications = /* GraphQL */ `
query ListPushNotifications(
  $filter: ModelPushNotificationFilterInput
  $limit: Int
  $nextToken: String
) {
  listPushNotifications(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      type
      title
      body
      status
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