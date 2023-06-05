import { Auth } from 'aws-amplify'

function authService() {
    const signIn = ({ email, password }) => Auth.signIn(email, password)

    const signUp = ({ email, password }) => Auth.signUp({
        username: email,
        password,
        attributes: {
            email,
        }
    })

    const signOut = () => Auth.signOut()

    const confirmCode = ({ email, code }) => Auth.confirmSignUp(email, code)

    const resendConfirmCode = ({ email }) => Auth.resendSignUp(email)

    const changePassword = ({ oldPassword, newPassword }) => Auth
        .currentAuthenticatedUser()
        .then((user) => Auth.changePassword(user, oldPassword, newPassword))
        .then(() => 'success')

    const forgotPassword = ({ email }) => Auth.forgotPassword(email)

    const resetPassword = ({ email, code, password }) => Auth.forgotPasswordSubmit(email, code, password)

    return {
        signIn,
        signUp,
        confirmCode,
        resendConfirmCode,
        forgotPassword,
        resetPassword,
        changePassword,
        signOut,
    }
}

export default authService
