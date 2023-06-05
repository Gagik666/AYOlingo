/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
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
export const getPushNotification = /* GraphQL */ `
  query GetPushNotification($id: ID!) {
    getPushNotification(id: $id) {
      id
      type
      title
      body
      createdAt
      updatedAt
    }
  }
`;
export const listPushNotifications = /* GraphQL */ `
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFeedback = /* GraphQL */ `
  query GetFeedback($id: ID!) {
    getFeedback(id: $id) {
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
export const listFeedbacks = /* GraphQL */ `
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
export const getProgress = /* GraphQL */ `
  query GetProgress($id: ID!) {
    getProgress(id: $id) {
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
export const listProgresses = /* GraphQL */ `
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
export const getLanguage = /* GraphQL */ `
  query GetLanguage($id: ID!) {
    getLanguage(id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const listLanguages = /* GraphQL */ `
  query ListLanguages(
    $filter: ModelLanguageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLanguages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getLanguageGroups = /* GraphQL */ `
  query GetLanguageGroups($id: ID!) {
    getLanguageGroups(id: $id) {
      id
      from
      to
      language
      createdAt
      updatedAt
    }
  }
`;
export const listLanguageGroups = /* GraphQL */ `
  query ListLanguageGroups(
    $filter: ModelLanguageGroupsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLanguageGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        from
        to
        language
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getText = /* GraphQL */ `
  query GetText($id: ID!) {
    getText(id: $id) {
      id
      transliteration
      maleAudio
      femaleAudio
      createdAt
      updatedAt
    }
  }
`;
export const listTexts = /* GraphQL */ `
  query ListTexts(
    $filter: ModelTextFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTexts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        transliteration
        maleAudio
        femaleAudio
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getModule = /* GraphQL */ `
  query GetModule($id: ID!) {
    getModule(id: $id) {
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
export const listModules = /* GraphQL */ `
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
export const getAudio = /* GraphQL */ `
  query GetAudio($id: ID!) {
    getAudio(id: $id) {
      id
      file
      gender
      type
      createdAt
      updatedAt
    }
  }
`;
export const listAudio = /* GraphQL */ `
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
export const getVocabulary = /* GraphQL */ `
  query GetVocabulary($id: ID!) {
    getVocabulary(id: $id) {
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
export const listVocabularies = /* GraphQL */ `
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
export const getAlphabet = /* GraphQL */ `
  query GetAlphabet($id: ID!) {
    getAlphabet(id: $id) {
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
export const listAlphabets = /* GraphQL */ `
  query ListAlphabets(
    $filter: ModelAlphabetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAlphabets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getExercises = /* GraphQL */ `
  query GetExercises($id: ID!) {
    getExercises(id: $id) {
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
export const listExercises = /* GraphQL */ `
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
export const usersByEmail = /* GraphQL */ `
  query UsersByEmail(
    $email: String
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    usersByEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
export const usersByFirstName = /* GraphQL */ `
  query UsersByFirstName(
    $type: String
    $firstName: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    usersByFirstName(
      type: $type
      firstName: $firstName
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
export const usersByLastName = /* GraphQL */ `
  query UsersByLastName(
    $type: String
    $lastName: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    usersByLastName(
      type: $type
      lastName: $lastName
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
export const usersByCreatedAt = /* GraphQL */ `
  query UsersByCreatedAt(
    $type: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    usersByCreatedAt(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
export const pushNotificationsByCreatedAt = /* GraphQL */ `
  query PushNotificationsByCreatedAt(
    $type: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPushNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    pushNotificationsByCreatedAt(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        title
        body
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const modulesByCreatedAt = /* GraphQL */ `
  query ModulesByCreatedAt(
    $type: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelModuleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    modulesByCreatedAt(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
export const modulesByOrder = /* GraphQL */ `
  query ModulesByOrder(
    $type: String
    $order: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelModuleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    modulesByOrder(
      type: $type
      order: $order
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
export const alphabetByLanguageGroup = /* GraphQL */ `
  query AlphabetByLanguageGroup(
    $languageGroup: ID
    $sortDirection: ModelSortDirection
    $filter: ModelAlphabetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    alphabetByLanguageGroup(
      languageGroup: $languageGroup
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const exercisesBySearch = /* GraphQL */ `
  query ExercisesBySearch(
    $search: String
    $sortDirection: ModelSortDirection
    $filter: ModelExercisesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    exercisesBySearch(
      search: $search
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
export const exercisesByModule = /* GraphQL */ `
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
export const searchUsers = /* GraphQL */ `
  query SearchUsers(
    $filter: SearchableUserFilterInput
    $sort: SearchableUserSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchUsers(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
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
      total
    }
  }
`;
export const searchFeedbacks = /* GraphQL */ `
  query SearchFeedbacks(
    $filter: SearchableFeedbackFilterInput
    $sort: SearchableFeedbackSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchFeedbacks(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
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
      total
    }
  }
`;
export const searchModules = /* GraphQL */ `
  query SearchModules(
    $filter: SearchableModuleFilterInput
    $sort: SearchableModuleSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchModules(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
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
      total
    }
  }
`;
export const searchAudio = /* GraphQL */ `
  query SearchAudio(
    $filter: SearchableAudioFilterInput
    $sort: SearchableAudioSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchAudio(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
        id
        file
        gender
        type
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
export const searchVocabularies = /* GraphQL */ `
  query SearchVocabularies(
    $filter: SearchableVocabularyFilterInput
    $sort: SearchableVocabularySortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchVocabularies(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
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
      total
    }
  }
`;
export const searchExercises = /* GraphQL */ `
  query SearchExercises(
    $filter: SearchableExercisesFilterInput
    $sort: SearchableExercisesSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchExercises(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
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
      nextToken
      total
    }
  }
`;
