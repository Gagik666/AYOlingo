import { API, graphqlOperation } from 'aws-amplify'
import {
    createUser as createUserMutation,
    updateUser as updateUserMutation,
} from '../../graphql/mutations'
import {
    getUser as getUserQuery,
    listUsers as listUsersQuery,
    usersByEmail as usersByEmailQuery,
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

    const usersByEmail = (variables) => API.graphql(
        graphqlOperation(usersByEmailQuery, variables),
    )

    const listUsers = (variables) => API.graphql(
        graphqlOperation(listUsersQuery, variables),
    )

    return {
        createUser,
        updateUser,
        getUser,
        usersByEmail,
        listUsers,
    }
}

export default userService
