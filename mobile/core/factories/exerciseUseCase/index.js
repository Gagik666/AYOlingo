import {
    MODULE_ID_IS_REQUIRED,
} from '../../constants'

const exerciseUseCase = (exerciseRepo) => {
    const createExercise = ({module, lessons}) => {
        let isValid = true
        const errors = {}

        if (!module) {
            errors.module = MODULE_ID_IS_REQUIRED
            isValid = false
        }

        if (!isValid) {
            throw Error(JSON.stringify({}))
        }
        return exerciseRepo.createExercise({module, lessons})
    }

    const updateExercise = (input) => exerciseRepo.updateExercise(input)

    const deleteExercise = (input) => exerciseRepo.deleteExercise(input)

    const getExercise = (id) => {
        if (!id) {
            throw Error('Get exercise: ID is required')
        }

        return exerciseRepo.getExercise(id)
    }

    const exercisesByModule = (variables) => exerciseRepo.exercisesByModule(variables)

    const listExercises = (variables) => exerciseRepo.listExercises(variables)

    const searchExercises = (variables) => exerciseRepo.searchExercises(variables)

    return {
        createExercise,
        getExercise,
        listExercises,
        searchExercises,
        exercisesByModule,
        deleteExercise,
        updateExercise,
    }
}

export default exerciseUseCase
