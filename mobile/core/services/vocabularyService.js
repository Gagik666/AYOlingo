import { API, graphqlOperation } from 'aws-amplify'
import {
    createVocabulary as createVocabularyMutation,
    updateVocabulary as updateVocabularyMutation,
    deleteVocabulary as deleteVocabularyMutation,
} from '../../graphql/mutations'
import {
    getVocabulary as getVocabularyQuery,
    listVocabularies as listVocabulariesQuery,
    searchVocabularies as searchVocabulariesQuery,
} from '../../graphql/queries'

const vocabularyService = () => {
    const createVocabulary = (input) => API.graphql(
        graphqlOperation(createVocabularyMutation, { input }),
    )

    const updateVocabulary = (input) => API.graphql(
        graphqlOperation(updateVocabularyMutation, { input }),
    )

    const deleteVocabulary = (input) => API.graphql(
        graphqlOperation(deleteVocabularyMutation, { input }),
    )

    const getVocabulary = (id) => API.graphql(
        graphqlOperation(getVocabularyQuery, { id }),
    )

    const listVocabularies = (variables) => API.graphql(
        graphqlOperation(listVocabulariesQuery, variables.queryKey[1]),
    )

    const searchVocabularies = (variables) => API.graphql(
        graphqlOperation(searchVocabulariesQuery, variables.queryKey[1]),
    )

    return {
        createVocabulary,
        updateVocabulary,
        deleteVocabulary,
        getVocabulary,
        listVocabularies,
        searchVocabularies,
    }
}

export default vocabularyService
