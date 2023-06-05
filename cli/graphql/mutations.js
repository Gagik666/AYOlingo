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
      pushNotificationToken
      deletedAt
      createdAt
      updatedAt
    }
  }
`;

module.exports.updateVocabulary = /* GraphQL */ `
  mutation UpdateVocabulary(
    $input: UpdateVocabularyInput!
    $condition: ModelVocabularyConditionInput
  ) {
    updateVocabulary(input: $input, condition: $condition) {
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
  }
`;

module.exports.updateAudio = /* GraphQL */ `
mutation UpdateAudio(
  $input: UpdateAudioInput!
  $condition: ModelAudioConditionInput
) {
  updateAudio(input: $input, condition: $condition) {
    id
    file
    gender
    type
    createdAt
    updatedAt
  }
}
`;

module.exports.updateExercises = /* GraphQL */ `
mutation UpdateExercises(
  $input: UpdateExercisesInput!
  $condition: ModelExercisesConditionInput
) {
  updateExercises(input: $input, condition: $condition) {
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
}
`;

module.exports.updatePushNotification = /* GraphQL */ `
mutation UpdatePushNotification(
  $input: UpdatePushNotificationInput!
  $condition: ModelPushNotificationConditionInput
) {
  updatePushNotification(input: $input, condition: $condition) {
    id
    type
    title
    body
    status
    createdAt
    updatedAt
  }
}
`;

module.exports.updateFeedback = /* GraphQL */ `
mutation UpdateFeedback(
  $input: UpdateFeedbackInput!
  $condition: ModelFeedbackConditionInput
) {
  updateFeedback(input: $input, condition: $condition) {
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
}
`;

module.exports.updateModule = /* GraphQL */ `
mutation UpdateModule(
  $input: UpdateModuleInput!
  $condition: ModelModuleConditionInput
) {
  updateModule(input: $input, condition: $condition) {
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
}
`;

module.exports.updateProgress = /* GraphQL */ `
mutation UpdateProgress(
  $input: UpdateProgressInput!
  $condition: ModelProgressConditionInput
) {
  updateProgress(input: $input, condition: $condition) {
    id
    type
    firstName
    lastName
    email
    lastLessonCompletedDate
    dayStreakCounter
    protectionCount
    badges
    modules
    deletedAt
    createdAt
    updatedAt
  }
}
`;