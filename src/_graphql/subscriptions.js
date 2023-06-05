/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
  }
`;
export const onCreatePushNotification = /* GraphQL */ `
  subscription OnCreatePushNotification {
    onCreatePushNotification {
      id
      type
      title
      body
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePushNotification = /* GraphQL */ `
  subscription OnUpdatePushNotification {
    onUpdatePushNotification {
      id
      type
      title
      body
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePushNotification = /* GraphQL */ `
  subscription OnDeletePushNotification {
    onDeletePushNotification {
      id
      type
      title
      body
      createdAt
      updatedAt
    }
  }
`;
export const onCreateFeedback = /* GraphQL */ `
  subscription OnCreateFeedback {
    onCreateFeedback {
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
export const onUpdateFeedback = /* GraphQL */ `
  subscription OnUpdateFeedback {
    onUpdateFeedback {
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
export const onDeleteFeedback = /* GraphQL */ `
  subscription OnDeleteFeedback {
    onDeleteFeedback {
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
export const onCreateProgress = /* GraphQL */ `
  subscription OnCreateProgress {
    onCreateProgress {
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
export const onUpdateProgress = /* GraphQL */ `
  subscription OnUpdateProgress {
    onUpdateProgress {
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
export const onDeleteProgress = /* GraphQL */ `
  subscription OnDeleteProgress {
    onDeleteProgress {
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
export const onCreateLanguage = /* GraphQL */ `
  subscription OnCreateLanguage {
    onCreateLanguage {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateLanguage = /* GraphQL */ `
  subscription OnUpdateLanguage {
    onUpdateLanguage {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteLanguage = /* GraphQL */ `
  subscription OnDeleteLanguage {
    onDeleteLanguage {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onCreateLanguageGroups = /* GraphQL */ `
  subscription OnCreateLanguageGroups {
    onCreateLanguageGroups {
      id
      from
      to
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateLanguageGroups = /* GraphQL */ `
  subscription OnUpdateLanguageGroups {
    onUpdateLanguageGroups {
      id
      from
      to
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteLanguageGroups = /* GraphQL */ `
  subscription OnDeleteLanguageGroups {
    onDeleteLanguageGroups {
      id
      from
      to
      createdAt
      updatedAt
    }
  }
`;
export const onCreateText = /* GraphQL */ `
  subscription OnCreateText {
    onCreateText {
      id
      transliteration
      maleAudio
      femaleAudio
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateText = /* GraphQL */ `
  subscription OnUpdateText {
    onUpdateText {
      id
      transliteration
      maleAudio
      femaleAudio
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteText = /* GraphQL */ `
  subscription OnDeleteText {
    onDeleteText {
      id
      transliteration
      maleAudio
      femaleAudio
      createdAt
      updatedAt
    }
  }
`;
export const onCreateModule = /* GraphQL */ `
  subscription OnCreateModule {
    onCreateModule {
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
export const onUpdateModule = /* GraphQL */ `
  subscription OnUpdateModule {
    onUpdateModule {
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
export const onDeleteModule = /* GraphQL */ `
  subscription OnDeleteModule {
    onDeleteModule {
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
export const onCreateAudio = /* GraphQL */ `
  subscription OnCreateAudio {
    onCreateAudio {
      id
      file
      gender
      type
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateAudio = /* GraphQL */ `
  subscription OnUpdateAudio {
    onUpdateAudio {
      id
      file
      gender
      type
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteAudio = /* GraphQL */ `
  subscription OnDeleteAudio {
    onDeleteAudio {
      id
      file
      gender
      type
      createdAt
      updatedAt
    }
  }
`;
export const onCreateVocabulary = /* GraphQL */ `
  subscription OnCreateVocabulary {
    onCreateVocabulary {
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
export const onUpdateVocabulary = /* GraphQL */ `
  subscription OnUpdateVocabulary {
    onUpdateVocabulary {
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
export const onDeleteVocabulary = /* GraphQL */ `
  subscription OnDeleteVocabulary {
    onDeleteVocabulary {
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
export const onCreateAlphabet = /* GraphQL */ `
  subscription OnCreateAlphabet {
    onCreateAlphabet {
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
export const onUpdateAlphabet = /* GraphQL */ `
  subscription OnUpdateAlphabet {
    onUpdateAlphabet {
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
export const onDeleteAlphabet = /* GraphQL */ `
  subscription OnDeleteAlphabet {
    onDeleteAlphabet {
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
export const onCreateExercises = /* GraphQL */ `
  subscription OnCreateExercises {
    onCreateExercises {
      id
      _module
      module
      search
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
export const onUpdateExercises = /* GraphQL */ `
  subscription OnUpdateExercises {
    onUpdateExercises {
      id
      _module
      module
      search
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
export const onDeleteExercises = /* GraphQL */ `
  subscription OnDeleteExercises {
    onDeleteExercises {
      id
      _module
      module
      search
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
