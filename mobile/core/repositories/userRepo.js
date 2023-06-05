const userRepo = (userService) => {
    const createUser = (input) => userService.createUser(input)

    const updateUser = (input) => userService.updateUser(input)

    const listUsers = (variables) => userService.listUsers(variables)

    const usersByEmail = (variables) => userService.usersByEmail(variables)

    const getUser = (id) => userService.getUser(id)

    return {
        createUser,
        updateUser,
        getUser,
        usersByEmail,
        listUsers,
    }
}

export default userRepo
