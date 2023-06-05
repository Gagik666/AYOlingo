/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
      passedLessonsCount
      deletedAt
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
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
      passedLessonsCount
      deletedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
      passedLessonsCount
      deletedAt
      createdAt
      updatedAt
    }
  }
`;
export const createPushNotification = /* GraphQL */ `
  mutation CreatePushNotification(
    $input: CreatePushNotificationInput!
    $condition: ModelPushNotificationConditionInput
  ) {
    createPushNotification(input: $input, condition: $condition) {
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
export const updatePushNotification = /* GraphQL */ `
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
export const deletePushNotification = /* GraphQL */ `
  mutation DeletePushNotification(
    $input: DeletePushNotificationInput!
    $condition: ModelPushNotificationConditionInput
  ) {
    deletePushNotification(input: $input, condition: $condition) {
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
export const createFeedback = /* GraphQL */ `
  mutation CreateFeedback(
    $input: CreateFeedbackInput!
    $condition: ModelFeedbackConditionInput
  ) {
    createFeedback(input: $input, condition: $condition) {
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
export const updateFeedback = /* GraphQL */ `
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
export const deleteFeedback = /* GraphQL */ `
  mutation DeleteFeedback(
    $input: DeleteFeedbackInput!
    $condition: ModelFeedbackConditionInput
  ) {
    deleteFeedback(input: $input, condition: $condition) {
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
export const createProgress = /* GraphQL */ `
  mutation CreateProgress(
    $input: CreateProgressInput!
    $condition: ModelProgressConditionInput
  ) {
    createProgress(input: $input, condition: $condition) {
      id
      type
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
export const updateProgress = /* GraphQL */ `
  mutation UpdateProgress(
    $input: UpdateProgressInput!
    $condition: ModelProgressConditionInput
  ) {
    updateProgress(input: $input, condition: $condition) {
      id
      type
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
export const deleteProgress = /* GraphQL */ `
  mutation DeleteProgress(
    $input: DeleteProgressInput!
    $condition: ModelProgressConditionInput
  ) {
    deleteProgress(input: $input, condition: $condition) {
      id
      type
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
export const createLanguage = /* GraphQL */ `
  mutation CreateLanguage(
    $input: CreateLanguageInput!
    $condition: ModelLanguageConditionInput
  ) {
    createLanguage(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const updateLanguage = /* GraphQL */ `
  mutation UpdateLanguage(
    $input: UpdateLanguageInput!
    $condition: ModelLanguageConditionInput
  ) {
    updateLanguage(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const deleteLanguage = /* GraphQL */ `
  mutation DeleteLanguage(
    $input: DeleteLanguageInput!
    $condition: ModelLanguageConditionInput
  ) {
    deleteLanguage(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const createLanguageGroups = /* GraphQL */ `
  mutation CreateLanguageGroups(
    $input: CreateLanguageGroupsInput!
    $condition: ModelLanguageGroupsConditionInput
  ) {
    createLanguageGroups(input: $input, condition: $condition) {
      id
      language
      from
      to
      createdAt
      updatedAt
    }
  }
`;
export const updateLanguageGroups = /* GraphQL */ `
  mutation UpdateLanguageGroups(
    $input: UpdateLanguageGroupsInput!
    $condition: ModelLanguageGroupsConditionInput
  ) {
    updateLanguageGroups(input: $input, condition: $condition) {
      id
      language
      from
      to
      createdAt
      updatedAt
    }
  }
`;
export const deleteLanguageGroups = /* GraphQL */ `
  mutation DeleteLanguageGroups(
    $input: DeleteLanguageGroupsInput!
    $condition: ModelLanguageGroupsConditionInput
  ) {
    deleteLanguageGroups(input: $input, condition: $condition) {
      id
      language
      from
      to
      createdAt
      updatedAt
    }
  }
`;
export const createText = /* GraphQL */ `
  mutation CreateText(
    $input: CreateTextInput!
    $condition: ModelTextConditionInput
  ) {
    createText(input: $input, condition: $condition) {
      id
      transliteration
      maleAudio
      femaleAudio
      createdAt
      updatedAt
    }
  }
`;
export const updateText = /* GraphQL */ `
  mutation UpdateText(
    $input: UpdateTextInput!
    $condition: ModelTextConditionInput
  ) {
    updateText(input: $input, condition: $condition) {
      id
      transliteration
      maleAudio
      femaleAudio
      createdAt
      updatedAt
    }
  }
`;
export const deleteText = /* GraphQL */ `
  mutation DeleteText(
    $input: DeleteTextInput!
    $condition: ModelTextConditionInput
  ) {
    deleteText(input: $input, condition: $condition) {
      id
      transliteration
      maleAudio
      femaleAudio
      createdAt
      updatedAt
    }
  }
`;
export const createModule = /* GraphQL */ `
  mutation CreateModule(
    $input: CreateModuleInput!
    $condition: ModelModuleConditionInput
  ) {
    createModule(input: $input, condition: $condition) {
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
export const updateModule = /* GraphQL */ `
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
export const deleteModule = /* GraphQL */ `
  mutation DeleteModule(
    $input: DeleteModuleInput!
    $condition: ModelModuleConditionInput
  ) {
    deleteModule(input: $input, condition: $condition) {
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
export const createAudio = /* GraphQL */ `
  mutation CreateAudio(
    $input: CreateAudioInput!
    $condition: ModelAudioConditionInput
  ) {
    createAudio(input: $input, condition: $condition) {
      id
      file
      gender
      type
      createdAt
      updatedAt
    }
  }
`;
export const updateAudio = /* GraphQL */ `
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
export const deleteAudio = /* GraphQL */ `
  mutation DeleteAudio(
    $input: DeleteAudioInput!
    $condition: ModelAudioConditionInput
  ) {
    deleteAudio(input: $input, condition: $condition) {
      id
      file
      gender
      type
      createdAt
      updatedAt
    }
  }
`;
export const createVocabulary = /* GraphQL */ `
  mutation CreateVocabulary(
    $input: CreateVocabularyInput!
    $condition: ModelVocabularyConditionInput
  ) {
    createVocabulary(input: $input, condition: $condition) {
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
export const updateVocabulary = /* GraphQL */ `
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
export const deleteVocabulary = /* GraphQL */ `
  mutation DeleteVocabulary(
    $input: DeleteVocabularyInput!
    $condition: ModelVocabularyConditionInput
  ) {
    deleteVocabulary(input: $input, condition: $condition) {
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
export const createAlphabet = /* GraphQL */ `
  mutation CreateAlphabet(
    $input: CreateAlphabetInput!
    $condition: ModelAlphabetConditionInput
  ) {
    createAlphabet(input: $input, condition: $condition) {
      id
      languageGroup
      letters {
        from
        fromInfo
        to
        toInfo
        audio
        audioInfo
        pronunciationLetter
        pronunciationText
        order
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateAlphabet = /* GraphQL */ `
  mutation UpdateAlphabet(
    $input: UpdateAlphabetInput!
    $condition: ModelAlphabetConditionInput
  ) {
    updateAlphabet(input: $input, condition: $condition) {
      id
      languageGroup
      letters {
        from
        fromInfo
        to
        toInfo
        audio
        audioInfo
        pronunciationLetter
        pronunciationText
        order
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteAlphabet = /* GraphQL */ `
  mutation DeleteAlphabet(
    $input: DeleteAlphabetInput!
    $condition: ModelAlphabetConditionInput
  ) {
    deleteAlphabet(input: $input, condition: $condition) {
      id
      languageGroup
      letters {
        from
        fromInfo
        to
        toInfo
        audio
        audioInfo
        pronunciationLetter
        pronunciationText
        order
      }
      createdAt
      updatedAt
    }
  }
`;
export const createExercises = /* GraphQL */ `
  mutation CreateExercises(
    $input: CreateExercisesInput!
    $condition: ModelExercisesConditionInput
  ) {
    createExercises(input: $input, condition: $condition) {
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
export const updateExercises = /* GraphQL */ `
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
export const deleteExercises = /* GraphQL */ `
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
