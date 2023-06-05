import {
    FROM_IS_REQUIRED,
    TO_IS_REQUIRED,
} from '../../constants'

const languageGroupUseCase = (languageGroupRepo) => {
    const createLanguageGroup = ({from, to}) => {
        let isValid = true
        const errors = {}
        if (!from) {
            errors.from = FROM_IS_REQUIRED
            isValid = false
        }
        if (!to) {
            errors.to = TO_IS_REQUIRED
            isValid = false
        }
        if (!isValid) {
            throw Error(JSON.stringify(errors))
        }
        return languageGroupRepo.createLanguageGroup({from, to})
    }

    const deleteLanguageGroup = (input) => languageGroupRepo.deleteLanguageGroup(input)

    const getLanguageGroup = (id) => {
        if (!id) {
            throw Error('Get language group: ID is required')
        }

        return languageGroupRepo.getLanguageGroup(id)
    }

    const listLanguageGroups = (variables) => languageGroupRepo.listLanguageGroups(variables)

    return {
        createLanguageGroup,
        getLanguageGroup,
        listLanguageGroups,
        deleteLanguageGroup,
    }
}

export default languageGroupUseCase
