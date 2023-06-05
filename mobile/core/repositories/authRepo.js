const authRepo = (authService) => {
    const signUp = ({ email, password }) => authService.signUp({
        email,
        password,
    })

    const confirmCode = ({ email, code }) => authService.confirmCode({
        email,
        code,
    })

    const resendConfirmCode = ({ email }) => authService.resendConfirmCode({ email })

    const signIn = ({ email, password }) => authService.signIn({
        email,
        password,
    })

    const signOut = () => authService.signOut()

    const changePassword = ({ oldPassword, newPassword }) => authService.changePassword({
        oldPassword,
        newPassword,
    })

    const forgotPassword = ({ email }) => authService.forgotPassword({ email })

    const resetPassword = ({ email, code, password }) => authService.resetPassword({
        email,
        code,
        password,
    })

    return {
        signIn,
        signUp,
        signOut,
        confirmCode,
        resendConfirmCode,
        forgotPassword,
        changePassword,
        resetPassword,
    }
}

export default authRepo
