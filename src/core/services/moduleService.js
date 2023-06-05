import { API, graphqlOperation } from 'aws-amplify'
import {
    createModule as createModuleMutation,
    updateModule as updateModuleMutation,
    deleteModule as deleteModuleMutation,
} from '../../graphql/mutations'
import {
    getModule as getModuleQuery,
    listModules as listModulesQuery,
    searchModules as searchModulesQuery,
    modulesByCreatedAt as modulesByCreatedAtQuery,
    modulesByOrder as modulesByOrderQuery
} from '../../graphql/queries'

const moduleService = () => {
    const createModule = (input) => API.graphql(
        graphqlOperation(createModuleMutation, { input }),
    )

    const updateModule = (input) => API.graphql(
        graphqlOperation(updateModuleMutation, { input }),
    )

    const deleteModule = (input) => API.graphql(
        graphqlOperation(deleteModuleMutation, { input }),
    )

    const getModule = (id) => API.graphql(
        graphqlOperation(getModuleQuery, { id }),
    )

    const listModules = (variables) => API.graphql(
        graphqlOperation(listModulesQuery, variables),
    )

    const searchModules = (variables) => API.graphql(
        graphqlOperation(searchModulesQuery, variables),
    )

    const modulesByCreatedAt = (variables) => API.graphql(
        graphqlOperation(modulesByCreatedAtQuery, variables),
    )

    const modulesByOrder = (variables) => API.graphql(
        graphqlOperation(modulesByOrderQuery, variables),
    )

    return {
        createModule,
        updateModule,
        deleteModule,
        getModule,
        listModules,
        modulesByCreatedAt,
        modulesByOrder,
        searchModules,
    }
}

export default moduleService
