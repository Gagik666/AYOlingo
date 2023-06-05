import { Audio } from 'expo-av'

export const S3_BUCKET = 'https://ayolingo153620-dev.s3.amazonaws.com/public/'

export const AVATAR = 'https://ayolingo153620-dev.s3.amazonaws.com/public/avatar.jpeg'

// ERROR MESSAGES
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
export const PASSWORD_PARAMETERS = `Check password parameters.`
export const VERIFICATION_CODE_IS_REQUIRED = 'Verification code is required'
export const CONFIRM_CODE_PAGE_WITHOUT_EMAIL = `You don't have access to the page`
export const SUCCESS = `Success`
export const PLEASE_VERIFY_YOUR_ACCOUNT = `Please check your email, and verify your account.`

export const COLORS = {
    purple: '#b869ff',
    green: '#24e069',
    blue: '#83b7ff',
    red: '#ed143d',
}

export const AUDIO_MODE = {
    playsInSilentModeIOS: true,
    allowsRecordingIOS: false,
    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
    shouldDuckAndroid: true,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
}

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