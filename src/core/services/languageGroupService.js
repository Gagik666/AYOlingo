import { API, graphqlOperation } from 'aws-amplify'
import {
    createLanguageGroups as createLanguageGroupMutation,
    updateLanguageGroups as updateLanguageGroupMutation,
    deleteLanguageGroups as deleteLanguageGroupMutation,
} from '../../graphql/mutations'
import {
    getLanguageGroups as getLanguageGroupQuery,
    listLanguageGroups as listLanguageGroupsQuery,
} from '../../graphql/queries'

const languageGroupService = () => {
    const createLanguageGroup = (input) => API.graphql(
        graphqlOperation(createLanguageGroupMutation, { input }),
    )

    const updateLanguageGroup = (input) => API.graphql(
        graphqlOperation(updateLanguageGroupMutation, { input }),
    )

    const deleteLanguageGroup = (input) => API.graphql(
        graphqlOperation(deleteLanguageGroupMutation, { input }),
    )

    const getLanguageGroup = (id) => API.graphql(
        graphqlOperation(getLanguageGroupQuery, { id }),
    )

    const listLanguageGroups = (variables) => API.graphql(
        graphqlOperation(listLanguageGroupsQuery, variables),
    )

    return {
        createLanguageGroup,
        getLanguageGroup,
        listLanguageGroups,
        deleteLanguageGroup,
        updateLanguageGroup,
    }
}

export default languageGroupService
