const exerciseRepo = (exerciseService) => {
    const createExercise = (input) => exerciseService.createExercise(input)

    const updateExercise = (input) => exerciseService.updateExercise(input)

    const deleteExercise = (input) => exerciseService.deleteExercise(input)

    const listExercises = (variables) => exerciseService.listExercises(variables)

    const searchExercises = (variables) => exerciseService.searchExercises(variables)

    const searchExercisesElastic = (data) => exerciseService.searchExercisesElastic(data)

    const exercisesByModule = (variables) => exerciseService.exercisesByModule(variables)

    const exercisesBySearch = (variables) => exerciseService.exercisesBySearch(variables)

    const getExercise = (id) => exerciseService.getExercise(id)

    return {
        createExercise,
        updateExercise,
        deleteExercise,
        getExercise,
        listExercises,
        searchExercises,
        searchExercisesElastic,
        exercisesByModule,
        exercisesBySearch,
    }
}

export default exerciseRepo
