import { API, graphqlOperation } from 'aws-amplify'
import {
    createExercises as createExerciseMutation,
    updateExercises as updateExerciseMutation,
    deleteExercises as deleteExerciseMutation,
} from '../../graphql/mutations'
import {
    getExercises as getExerciseQuery,
    listExercises as listExercisesQuery,
    searchExercises as searchExercisesQuery,
    exercisesByModule as exercisesByModuleQuery
} from '../../graphql/queries'

const exerciseService = () => {
    const createExercise = (input) => API.graphql(
        graphqlOperation(createExerciseMutation, { input }),
    )

    const updateExercise = (input) => API.graphql(
        graphqlOperation(updateExerciseMutation, { input }),
    )

    const deleteExercise = (input) => API.graphql(
        graphqlOperation(deleteExerciseMutation, { input }),
    )

    const getExercise = (id) => API.graphql(
        graphqlOperation(getExerciseQuery, { id }),
    )

    const listExercises = (variables) => API.graphql(
        graphqlOperation(listExercisesQuery, variables.queryKey[1]),
    )

    const searchExercises = (variables) => API.graphql(
        graphqlOperation(searchExercisesQuery, variables),
    )

    const exercisesByModule = (variables) => API.graphql(
        graphqlOperation(exercisesByModuleQuery, variables),
    )

    return {
        createExercise,
        updateExercise,
        deleteExercise,
        getExercise,
        listExercises,
        exercisesByModule,
        searchExercises,
    }
}

export default exerciseService
