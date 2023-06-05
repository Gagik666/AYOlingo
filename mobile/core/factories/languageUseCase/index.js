import {
    CODE_IS_REQUIRED,
    NAME_IS_REQUIRED,
} from '../../constants'

const languageUseCase = (languageRepo) => {
    const createLanguage = ({id, name}) => {
        let isValid = true
        const errors = {}
        if (!id) {
            errors.code = CODE_IS_REQUIRED
            isValid = false
        }
        if (!name) {
            errors.name = NAME_IS_REQUIRED
            isValid = false
        }
        if (!isValid) {
            throw Error(JSON.stringify(errors))
        }
        return languageRepo.createLanguage({id, name})
    }

    const deleteLanguage = (input) => languageRepo.deleteLanguage(input)

    const getLanguage = (id) => {
        if (!id) {
            throw Error('Get Language: ID is required')
        }

        return languageRepo.getLanguage(id)
    }

    const listLanguages = (variables) => languageRepo.listLanguages(variables)

    return {
        createLanguage,
        getLanguage,
        listLanguages,
        deleteLanguage,
    }
}

export default languageUseCase
