import { API, graphqlOperation } from 'aws-amplify'
import {
    createLanguage as createLanguageMutation,
    deleteLanguage as deleteLanguageMutation,
} from '../../graphql/mutations'
import {
    getLanguage as getLanguageQuery,
    listLanguages as listLanguagesQuery,
} from '../../graphql/queries'

const languageService = () => {
    const createLanguage = (input) => API.graphql(
        graphqlOperation(createLanguageMutation, { input }),
    )

    const deleteLanguage = (input) => API.graphql(
        graphqlOperation(deleteLanguageMutation, { input }),
    )

    const getLanguage = (id) => API.graphql(
        graphqlOperation(getLanguageQuery, { id }),
    )

    const listLanguages = (variables) => API.graphql(
        graphqlOperation(listLanguagesQuery, variables),
    )

    return {
        createLanguage,
        getLanguage,
        listLanguages,
        deleteLanguage,
    }
}

export default languageService
