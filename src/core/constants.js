import {
    RiFeedbackLine,
} from 'react-icons/ri'
import {
    BiCollection
} from 'react-icons/bi'
import {
    FiSettings,
    FiUsers,
} from 'react-icons/fi'
import {
    IoNotificationsOutline,
} from 'react-icons/io5'
import { GrLanguage } from 'react-icons/gr'

export const ELASTIC_SEARCH_URL = 'https://search-amplify-elasti-13o9sgn5alo41-ruu4wqrbqkajvoy4i4k2pfctkq.us-east-1.es.amazonaws.com'
export const SEND_PUSH_NOTIFICATION_URL = 'https://1oa0cmev23.execute-api.us-east-1.amazonaws.com/default/pushNotification-dev'
export const SEND_INVITATION_URL = 'https://k6fpndrtg0.execute-api.us-east-1.amazonaws.com/default/inviteUser-dev'
export const S3_BUCKET = 'https://ayolingo153620-dev.s3.amazonaws.com/public/'

// ERROR MESSAGES
export const VALUE_FROM = 'Value from'
export const TRANSLITERATION_FROM = 'Transliteration from'
export const AUDIO_FROM = 'Audio from'
export const ALPHABET_LETTER_FROM = 'Alphabet letter from'
export const VALUE_TO = 'Value to'
export const TRANSLITERATION_TO = 'Transliteration to'
export const AUDIO_TO = 'Audio to'
export const ALPHABET_LETTER_TO = 'Alphabet letter to'
export const TITLE_IS_REQUIRED = 'Title is required'
export const BODY_IS_REQUIRED = 'Body is required'
export const PLEASE_ADD_LANGUAGE_GROUP = 'Please add language group'
export const PLEASE_ADD_LANGUAGE = 'Please add language'
export const LANGUAGE_GROUP_EXISTS = 'Language group already exists'
export const FROM_IS_REQUIRED = 'From is required'
export const TO_IS_REQUIRED = 'To is required'
export const CODE_IS_REQUIRED = 'Code is required'
export const MODULE_ID_IS_REQUIRED = 'Module ID is required'
export const DIFFICULTY_IS_REQUIRED = 'Difficulty is required'
export const IMAGE_IS_REQUIRED = 'Image is required'
export const DURATION_IS_REQUIRED = 'Duration is required'
export const NAME_IS_REQUIRED = 'Name is required'
export const LAST_NAME_IS_REQUIRED = 'Last name is required'
export const FIRST_NAME_IS_REQUIRED = 'First name is required'
export const EMAIL_ADDRESS_IS_REQUIRED = 'Email address is required'
export const INVALID_EMAIL_ADDRESS = 'Invalid email address'
export const PASSWORD_IS_REQUIRED = 'Password is required'
export const CONFIRM_PASSWORD_IS_REQUIRED = 'Confirm password is required'
export const PASSWORDS_DONT_MATCH = `Passwords don't match`
export const ACCOUNT_WITH_EMAIL_ALREADY_EXISTS = `An account with the given email already exists.`
export const PASSWORD_PARAMETERS = `Check password parameters, must include minimum 6 characters`
export const VERIFICATION_CODE_IS_REQUIRED = 'Verification code is required'
export const CONFIRM_CODE_PAGE_WITHOUT_EMAIL = `You don't have access to the page`
export const SUCCESS = `Success`
export const PLEASE_VERIFY_YOUR_ACCOUNT = `Please check your email, and verify your account.`
export const EXERCISE_TYPES = {
    fill_in_the_blank: 'Fill in the blank',
    match_these_translations: 'Match these translations',
    select_translation: 'Select translation',
    translate_this_phrase: 'Translate this phrase',
    match_these_pairs: 'Match these pairs',
}

export const FEEDBACK_TYPES = {
    the_audio_is_incorrect: 'The audio is incorrect',
    the_audio_is_missing: 'The audio is missing',
    my_answer_should_have_been_accepted: 'My answer should have been accepted',
    my_answer_should_have_not_been_accepted: 'My answer should have not been accepted',
    a_word_is_missing_in_the_answer_choice: 'A word is missing in the answer choice',
    the_sentence_has_an_error: 'The sentence has an error',
    something_else_is_wrong: 'Something else is wrong',
}

export const DIFFICULTY = [
    'intermediate',
    'beginner',
    'expert',
]

export const GENDER = [
    'male',
    'female',
]

export const EMPTY_TEXT = {
    id: '', // value,
    transliteration: '',
    // language: '',
    // maleAudio: '',
    // femaleAudio: '',
}

export const EMPTY_ANSWER = {
    value: EMPTY_TEXT,
    right: false,
    image: '',
    id: new Date().getTime() * Math.random()
}

export const EMPTY_QUIZ = {
    id: new Date().getTime() * Math.random(),
    question: EMPTY_TEXT,
    answers: [EMPTY_ANSWER]
}

export const EMPTY_EXERCISE = {
    type: '',
    quiz: [EMPTY_QUIZ]
}

export const EMPTY_VOCABULARY = {
    _languageGroup: '',
    valueFrom: '',
    transliterationFrom: '',
    audioFrom: '',
    alphabetLetterFrom: '',
    alphabetIndexFrom: 0,
    valueTo: '',
    transliterationTo: '',
    audioTo: '',
    alphabetLetterTo: '',
    alphabetIndexTo: 0,
}

export const NAV_ITEMS = [
    {
        label: 'Collection',
        icon: BiCollection,
        dropdown: true,
        to: '/collection',
        dropdownItems: [
            {
                label: 'Modules',
                to: '/collection/modules/list',
            },
            {
                label: 'Vocabulary',
                to: '/collection/vocabulary',
            },
            {
                label: 'Tree view',
                to: '/collection/tree-view',
            },
            {
                label: 'Audios',
                to: '/collection/audios',
            },
        ]
    },
    {
        label: 'Users',
        icon: FiUsers,
        dropdown: true,
        to: '/users',
        dropdownItems: [
            {
                label: 'List',
                to: '/users/list',
            },
            {
                label: 'Invite',
                to: '/users/invite',
            },
        ]
    },
    {
        label: 'Languages',
        icon: GrLanguage,
        dropdown: true,
        to: '/languages',
        dropdownItems: [
            {
                label: 'List',
                to: '/languages/list',
            },
            {
                label: 'Groups',
                to: '/languages/groups',
            },
            {
                label: 'Alphabet',
                to: '/languages/alphabet',
            },
        ]
    },
    {
        label: 'Push Notification',
        icon: IoNotificationsOutline,
        to: '/push-notifications',
    },
    {
        label: 'Feedback',
        icon: RiFeedbackLine,
        to: '/feedback',
    },
    {
        label: 'Configurations',
        icon: FiSettings,
        to: '/configurations',
    },
]

export const ARMENIAN_CHARACTERS = [
    'ա',
    'բ',
    'գ',
    'դ',
    'ե',
    'զ',
    'է',
    'ը',
    'թ',
    'ժ',
    'ի',
    'լ',
    'խ',
    'ծ',
    'կ',
    'հ',
    'ձ',
    'ղ',
    'ճ',
    'մ',
    'յ',
    'ն',
    'շ',
    'ո',
    'չ',
    'պ',
    'ջ',
    'ռ',
    'ս',
    'վ',
    'տ',
    'ր',
    'ց',
    'ու',
    'փ',
    'ք',
    'և',
    'օ',
    'ֆ',
    'Ա',
    'Բ',
    'Գ',
    'Դ',
    'Ե',
    'Զ',
    'Է',
    'Ը',
    'Թ',
    'Ժ',
    'Ի',
    'Լ',
    'Խ',
    'Ծ',
    'Կ',
    'Հ',
    'Ձ',
    'Ղ',
    'Ճ',
    'Մ',
    'Յ',
    'Ն',
    'Շ',
    'Ո',
    'Չ',
    'Պ',
    'Ջ',
    'Ռ',
    'Ս',
    'Վ',
    'Տ',
    'Ր',
    'ՈՒ',
    'Փ',
    'Ք',
    'ԵՎ',
    'Օ',
    'Ֆ',
  ]