import { Auth } from 'aws-amplify'

const userUseCase = (userRepo, progressRepo) => {
    const createUser = (input) => userRepo.createUser(input) // NO VALIDATIONS NEED
    const updateUser = (input) => {
        if (!input?.id) {
            throw Error('ID is required')
        }
        return userRepo.updateUser(input)
    }

    const getUser = (id) => {
        if (!id) {
            throw Error('ID is required')
        }

        return userRepo.getUser(id)
    }

    const listUsers = (variables) => userRepo.listUsers(variables)

    const searchUsers = (variables) => userRepo.searchUsers(variables)

    const usersByEmail = (variables) => userRepo.usersByEmail(variables)

    const usersByCreatedAt = (variables) => userRepo.usersByCreatedAt(variables)

    const usersByFirstName = (variables) => userRepo.usersByFirstName(variables)

    const usersByLastName = (variables) => userRepo.usersByLastName(variables)

    const getSignedInUser = async () => {
        try {
            const cognitoUser = await Auth.currentAuthenticatedUser()
            const user = await usersByEmail({
                email: cognitoUser.attributes.email
            })
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
        listUsers,
        searchUsers,
        getSignedInUser,
        usersByEmail,
        usersByCreatedAt,
        usersByFirstName,
        usersByLastName,
    }
}

export default userUseCase
