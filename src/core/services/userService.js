import { API, graphqlOperation } from 'aws-amplify'
import {
    createUser as createUserMutation,
    updateUser as updateUserMutation,
} from '../../graphql/mutations'
import {
    getUser as getUserQuery,
    listUsers as listUsersQuery,
    searchUsers as searchUsersQuery,
    usersByEmail as usersByEmailQuery,
    usersByFirstName as usersByFirstNameQuery,
    usersByLastName as usersByLastNameQuery,
    usersByCreatedAt as usersByCreatedAtQuery,
} from '../../graphql/queries'

const userService = () => {
    const createUser = (input) => API.graphql(
        graphqlOperation(createUserMutation, { input }),
    )

    const updateUser = (input) => API.graphql(
        graphqlOperation(updateUserMutation, { input }),
    )

    const getUser = (id) => API.graphql(
        graphqlOperation(getUserQuery, { id }),
    )

    const listUsers = (variables) => API.graphql(
        graphqlOperation(listUsersQuery, variables),
    )

    const searchUsers = (variables) => API.graphql(
        graphqlOperation(searchUsersQuery, variables),
    )

    const usersByEmail = (variables) => API.graphql(
        graphqlOperation(usersByEmailQuery, variables),
    )

    const usersByCreatedAt = (variables) => API.graphql(
        graphqlOperation(usersByCreatedAtQuery, variables),
    )

    const usersByFirstName = (variables) => API.graphql(
        graphqlOperation(usersByFirstNameQuery, variables),
    )

    const usersByLastName = (variables) => API.graphql(
        graphqlOperation(usersByLastNameQuery, variables),
    )

    return {
        createUser,
        updateUser,
        getUser,
        listUsers,
        searchUsers,
        usersByEmail,
        usersByCreatedAt,
        usersByFirstName,
        usersByLastName,
    }
}

export default userService
