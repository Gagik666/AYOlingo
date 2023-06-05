import { API, graphqlOperation } from 'aws-amplify'
import axios from 'axios'
import { aws4Interceptor } from 'aws4-axios'
import { ELASTIC_SEARCH_URL } from '../constants'
import {
    createExercises as createExerciseMutation,
    updateExercises as updateExerciseMutation,
    deleteExercises as deleteExerciseMutation,
} from '../../graphql/mutations'
import {
    getExercises as getExerciseQuery,
    listExercises as listExercisesQuery,
    searchExercises as searchExercisesQuery,
    exercisesByModule as exercisesByModuleQuery,
    exercisesBySearch as exercisesBySearchQuery,
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

    const exercisesBySearch = (variables) => API.graphql(
        graphqlOperation(exercisesBySearchQuery, variables),
    )

    const getExercise = (id) => API.graphql(
        graphqlOperation(getExerciseQuery, { id }),
    )

    const listExercises = (variables) => API.graphql(
        graphqlOperation(listExercisesQuery, variables),
    )

    const searchExercises = (variables) => API.graphql(
        graphqlOperation(searchExercisesQuery, variables),
    )

    const exercisesByModule = (variables) => API.graphql(
        graphqlOperation(exercisesByModuleQuery, variables),
    )

    const searchExercisesElastic = (data) => {
        const client = axios.create();

        const interceptor = aws4Interceptor(
            {
                region: 'us-east-1',
                service: 'es',
            },
            {
                accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
                secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
            }
        )

        client.interceptors.request.use(interceptor)

        return client.post(`${ELASTIC_SEARCH_URL}/exercises/_search`, data)
    }

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

export default exerciseService
