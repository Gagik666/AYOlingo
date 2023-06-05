import {
    MODULE_ID_IS_REQUIRED,
} from '../../constants'

const exerciseUseCase = (exerciseRepo) => {
    const createExercise = ({module, lessons, _languageGroup, published}) => {
        let isValid = true
        const errors = {}

        if (!module) {
            errors.module = MODULE_ID_IS_REQUIRED
            isValid = false
        }

        if (!isValid) {
            throw Error(JSON.stringify({}))
        }
        return exerciseRepo.createExercise({module, lessons, _languageGroup, published})
    }
    
    const exercisesBySearch = (input) => exerciseRepo.exercisesBySearch(input)

    const updateExercise = (input) => exerciseRepo.updateExercise(input)

    const searchExercises = (data) => exerciseRepo.searchExercises(data)

    const searchExercisesElastic = (data) => exerciseRepo.searchExercisesElastic(data)

    const deleteExercise = (input) => exerciseRepo.deleteExercise(input)

    const getExercise = (id) => {
        if (!id) {
            throw Error('ID is required')
        }

        return exerciseRepo.getExercise(id)
    }

    const exercisesByModule = (variables) => exerciseRepo.exercisesByModule(variables)

    const listExercises = (variables) => exerciseRepo.listExercises(variables)

    return {
        createExercise,
        getExercise,
        searchExercises,
        searchExercisesElastic,
        listExercises,
        exercisesByModule,
        deleteExercise,
        updateExercise,
        exercisesBySearch,
    }
}

export default exerciseUseCase
