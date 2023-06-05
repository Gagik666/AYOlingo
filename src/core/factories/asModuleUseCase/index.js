import {
    DIFFICULTY_IS_REQUIRED,
    NAME_IS_REQUIRED,
} from '../../constants'

const moduleUseCase = (moduleRepo) => {
    const createModule = ({name, difficulty, image, duration, _languageGroup, published, regression, type, createdAt, speakerGender, order}) => {
        let isValid = true
        const errors = {}
        if (!difficulty) {
            errors.difficulty = DIFFICULTY_IS_REQUIRED
            isValid = false
        }
        if (!name) {
            errors.name = NAME_IS_REQUIRED
            isValid = false
        }
        if (!isValid) {
            throw Error(JSON.stringify(errors))
        }
        return moduleRepo.createModule({name, difficulty, image, duration, _languageGroup, published, regression, type, createdAt, speakerGender, order})
    }

    const updateModule = ({id, name, difficulty, image, duration, _languageGroup, published, regression, speakerGender, order}) => {
        let isValid = true
        const errors = {}
        if (!id) {
            throw Error('Something went wrong')
        }
        if (!difficulty) {
            errors.difficulty = DIFFICULTY_IS_REQUIRED
            isValid = false
        }
        if (!name) {
            errors.name = NAME_IS_REQUIRED
            isValid = false
        }
        if (!isValid) {
            throw Error(JSON.stringify(errors))
        }
        return moduleRepo.updateModule({id, name, difficulty, image, duration, _languageGroup, published, regression, speakerGender, order})
    }

    const deleteModule = (id) => {
        if (!id) {
            throw Error('ID is required')
        }

        return moduleRepo.deleteModule(id)
    }

    const getModule = (id) => {
        if (!id) {
            throw Error('ID is required')
        }

        return moduleRepo.getModule(id)
    }

    const modulesByCreatedAt = (variables) => moduleRepo.modulesByCreatedAt(variables)
    
    const modulesByOrder = (variables) => moduleRepo.modulesByOrder(variables)

    const listModules = (variables) => moduleRepo.listModules(variables)

    const searchModules = (variables) => moduleRepo.searchModules(variables)

    return {
        createModule,
        updateModule,
        searchModules,
        deleteModule,
        getModule,
        listModules,
        modulesByCreatedAt,
        modulesByOrder,
    }
}

export default moduleUseCase
