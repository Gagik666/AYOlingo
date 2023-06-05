import {
    VALUE_FROM,
    VALUE_TO,
    TRANSLITERATION_FROM,
    ALPHABET_LETTER_FROM,
    TRANSLITERATION_TO,
    AUDIO_FROM,
    AUDIO_TO,
    ALPHABET_LETTER_TO,
} from '../../constants'

const vocabularyUseCase = (vocabularyRepo) => {
    const createVocabulary = (input) => {
        let isValid = true
        const errors = {}

        if (!input.valueFrom) {
            errors.valueFrom = VALUE_FROM
            isValid = false
        }

        if (!input.transliterationFrom) {
            errors.transliterationFrom = TRANSLITERATION_FROM
            isValid = false
        }

        // if (!input.audioFrom) {
        //     errors.audioFrom = AUDIO_FROM
        //     isValid = false
        // }

        // if (!input.alphabetLetterFrom || !input.alphabetIndexFrom) {
        //     errors.alphabetLetterFrom = ALPHABET_LETTER_FROM
        //     isValid = false
        // }

        if (!input.valueTo) {
            errors.valueTo = VALUE_TO
            isValid = false
        }

        if (!input.transliterationTo) {
            errors.transliterationTo = TRANSLITERATION_TO
            isValid = false
        }

        // if (!input.audioTo) {
        //     errors.audioTo = AUDIO_TO
        //     isValid = false
        // }

        // if (!input.alphabetLetterTo) {
        //     errors.alphabetLetterTo = ALPHABET_LETTER_TO
        //     isValid = false
        // }

        if (!isValid) {
            throw Error(JSON.stringify(errors))
        }
        return vocabularyRepo.createVocabulary(input)
    }

    const updateVocabulary = (input) => {
        let isValid = true
        const errors = {}

        if (!input.valueFrom) {
            errors.valueFrom = VALUE_FROM
            isValid = false
        }

        if (!input.transliterationFrom) {
            errors.transliterationFrom = TRANSLITERATION_FROM
            isValid = false
        }

        if (!input.valueTo) {
            errors.valueTo = VALUE_TO
            isValid = false
        }

        if (!input.transliterationTo) {
            errors.transliterationTo = TRANSLITERATION_TO
            isValid = false
        }

        if (!isValid) {
            throw Error(JSON.stringify(errors))
        }
        return vocabularyRepo.updateVocabulary(input)
    }

    const deleteVocabulary = (input) => vocabularyRepo.deleteVocabulary(input)

    const getVocabulary = (id) => {
        if (!id) {
            throw Error('ID is required')
        }

        return vocabularyRepo.getVocabulary(id)
    }

    const listVocabularies = (variables) => vocabularyRepo.listVocabularies(variables)

    const searchVocabularies = (variables) => vocabularyRepo.searchVocabularies(variables)

    return {
        createVocabulary,
        getVocabulary,
        listVocabularies,
        searchVocabularies,
        deleteVocabulary,
        updateVocabulary,
    }
}

export default vocabularyUseCase
