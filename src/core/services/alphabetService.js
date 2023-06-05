import { API, graphqlOperation } from 'aws-amplify'
import {
    createAlphabet as createAlphabetMutation,
    updateAlphabet as updateAlphabetMutation,
    deleteAlphabet as deleteAlphabetMutation,
} from '../../graphql/mutations'
import {
    getAlphabet as getAlphabetQuery,
    listAlphabets as listAlphabetsQuery,
} from '../../graphql/queries'

const alphabetService = () => {
    const createAlphabet = (input) => API.graphql(
        graphqlOperation(createAlphabetMutation, { input }),
    )

    const updateAlphabet = (input) => API.graphql(
        graphqlOperation(updateAlphabetMutation, { input }),
    )

    const deleteAlphabet = (input) => API.graphql(
        graphqlOperation(deleteAlphabetMutation, { input }),
    )

    const getAlphabet = (id) => API.graphql(
        graphqlOperation(getAlphabetQuery, { id }),
    )

    const listAlphabets = (variables) => API.graphql(
        graphqlOperation(listAlphabetsQuery, variables),
    )

    return {
        createAlphabet,
        updateAlphabet,
        deleteAlphabet,
        getAlphabet,
        listAlphabets,
    }
}

export default alphabetService
