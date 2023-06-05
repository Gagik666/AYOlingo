import {
    IMAGE_IS_REQUIRED,
    DIFFICULTY_IS_REQUIRED,
    NAME_IS_REQUIRED,
    DURATION_IS_REQUIRED,
} from '../../constants'

const moduleUseCase = (moduleRepo) => {
    const createModule = ({name, difficulty, image, duration, _languageGroup, published, regression}) => {
        let isValid = true
        const errors = {}
        if (!difficulty) {
            errors.difficulty = DIFFICULTY_IS_REQUIRED
            isValid = false
        }
        if (!duration) {
            errors.duration = DURATION_IS_REQUIRED
            isValid = false
        }
        if (!name) {
            errors.name = NAME_IS_REQUIRED
            isValid = false
        }
        if (!image) {
            errors.image = IMAGE_IS_REQUIRED
            isValid = false
        }
        if (!isValid) {
            throw Error(JSON.stringify(errors))
        }
        return moduleRepo.createModule({name, difficulty, image, duration, _languageGroup, published, regression})
    }

    const updateModule = ({id, name, difficulty, image, duration, _languageGroup, published, regression}) => {
        if (!id) {
            throw Error('Something went wrong')
        }
        return moduleRepo.updateModule({id, name, difficulty, image, duration, _languageGroup, published, regression})
    }

    const deleteModule = (id) => {
        if (!id) {
            throw Error('Delete module: ID is required')
        }

        return moduleRepo.deleteModule(id)
    }

    const getModule = (id) => {
        if (!id) {
            throw Error('Get module: ID is required')
        }

        return moduleRepo.getModule(id)
    }

    const listModules = (variables) => moduleRepo.listModules(variables)

    const searchModules = (variables) => moduleRepo.searchModules(variables)

    return {
        createModule,
        updateModule,
        deleteModule,
        getModule,
        listModules,
        searchModules,
    }
}

export default moduleUseCase
