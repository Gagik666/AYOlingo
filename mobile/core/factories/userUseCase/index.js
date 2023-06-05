import { Auth } from 'aws-amplify'

const userUseCase = (userRepo) => {
    const createUser = (input) => userRepo.createUser(input) // NO VALIDATIONS NEED
    const updateUser = (input) => {
        if (!input?.id) {
            throw Error('Update user: ID is required')
        }
        return userRepo.updateUser(input)
    }

    const getUser = (id) => {
        if (!id) {
            throw Error('Get user: ID is required')
        }

        return userRepo.getUser(id)
    }

    const usersByEmail = (variables) => userRepo.usersByEmail(variables)

    const listUsers = (variables) => userRepo.listUsers(variables)

    const getCurrentAuthenticatedUser = async () => {
        try {
            return await Auth.currentAuthenticatedUser()
        } catch (e) {
            console.log('get current authenticated user error -> ', e)
            return null
        }
    }

    const getSignedInUser = async () => {
        try {
            const cognitoUser = await Auth.currentAuthenticatedUser()
            const user = await usersByEmail({email: cognitoUser.attributes.email})
            return user.data.usersByEmail.items[0]
        } catch (e) {
            console.log('get signed in user error -> ', e)
            return null
        }
    }

    return {
        createUser,
        updateUser,
        getUser,
        usersByEmail,
        listUsers,
        getSignedInUser,
        getCurrentAuthenticatedUser,
    }
}

export default userUseCase
