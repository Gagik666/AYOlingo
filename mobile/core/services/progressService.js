import { API, graphqlOperation } from 'aws-amplify'
import {
    createProgress as createProgressMutation,
    updateProgress as updateProgressMutation,
} from '../../graphql/mutations'
import {
    getProgress as getProgressQuery,
    listProgresses as listProgressesQuery,
} from '../../graphql/queries'

const progressService = () => {
    const createProgress = (input) => API.graphql(
        graphqlOperation(createProgressMutation, { input }),
    )

    const updateProgress = (input) => API.graphql(
        graphqlOperation(updateProgressMutation, { input }),
    )

    const getProgress = (id) => API.graphql(
        graphqlOperation(getProgressQuery, { id }),
    )

    const listProgresses = (variables) => API.graphql(
        graphqlOperation(listProgressesQuery, variables),
    )

    return {
        createProgress,
        updateProgress,
        getProgress,
        listProgresses,
    }
}

export default progressService
