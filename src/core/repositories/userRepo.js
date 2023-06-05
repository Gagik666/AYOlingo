const userRepo = (userService) => {
    const createUser = (input) => userService.createUser(input)

    const updateUser = (input) => userService.updateUser(input)

    const listUsers = (variables) => userService.listUsers(variables)

    const searchUsers = (variables) => userService.searchUsers(variables)

    const usersByEmail = (variables) => userService.usersByEmail(variables)

    const usersByCreatedAt = (variables) => userService.usersByCreatedAt(variables)

    const usersByFirstName = (variables) => userService.usersByFirstName(variables)

    const usersByLastName = (variables) => userService.usersByLastName(variables)

    const getUser = (id) => userService.getUser(id)

    return {
        createUser,
        updateUser,
        getUser,
        listUsers,
        searchUsers,
        usersByCreatedAt,
        usersByFirstName,
        usersByEmail,
        usersByLastName,
    }
}

export default userRepo
