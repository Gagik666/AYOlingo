import { ValidateEmail } from '../../helpers'
import {
    FIRST_NAME_IS_REQUIRED,
    LAST_NAME_IS_REQUIRED,
    EMAIL_ADDRESS_IS_REQUIRED,
    INVALID_EMAIL_ADDRESS,
    PASSWORD_IS_REQUIRED,
    CONFIRM_PASSWORD_IS_REQUIRED,
    PASSWORDS_DONT_MATCH,
} from '../../constants'

const authUseCase = (authRepo) => {
    const signIn = async ({ email, password }) => {
        if (!email || !password) {
            throw Error('Credentials cannot be empty')
        }

        if (!ValidateEmail(email)) {
            throw Error('Wrong email format')
        }

        return authRepo.signIn({
            email,
            password,
        })
    }

    const signUp = async ({ firstName, lastName, email, password, confirm_password }) => {
        let isValid = true
        const errors = {}
        if (!firstName) {
            errors.firstName = FIRST_NAME_IS_REQUIRED
            isValid = false
        }
        if (!lastName) {
            errors.lastName = LAST_NAME_IS_REQUIRED
            isValid = false
        }
        if (!email) {
            errors.email = EMAIL_ADDRESS_IS_REQUIRED
            isValid = false
        }
        if (!password) {
            errors.password = PASSWORD_IS_REQUIRED
            isValid = false
        }
        if (!confirm_password) {
            errors.confirm_password = CONFIRM_PASSWORD_IS_REQUIRED
            isValid = false
        }
        if (password && confirm_password && password !== confirm_password) {
            errors.confirm_password = PASSWORDS_DONT_MATCH
            isValid = false
        }
        if (email && !ValidateEmail(email)) {
            errors.email = INVALID_EMAIL_ADDRESS
            isValid = false
        }
        if (!isValid) {
            throw Error(JSON.stringify(errors))
        }

        const response = await authRepo.signUp({
            email,
            password,
        })

        return response
    }

    const signOut = async () => {
        try {
            await authRepo.signOut()
            return true
        } catch (e) {
            console.log(e)
            return e
        }
    }

    const confirmCode = async ({ email, code }) => {
        if (!email || !code) {
            throw Error('Credentials cannot be empty')
        }

        if (!ValidateEmail(email)) {
            throw Error('Wrong email format')
        }

        const response = await authRepo.confirmCode({
            email,
            code,
        })

        return response
    }

    const resendConfirmCode = async ({ email }) => {
        if (!ValidateEmail(email)) {
            throw Error('Wrond email format')
        }

        const response = await authRepo.resendConfirmCode({ email })

        return response
    }

    const changePassword = ({ oldPassword, newPassword, confirmPassword }) => {
        if (!oldPassword || !newPassword || !confirmPassword) {
            throw Error('Old, new and confirm password fields are required')
        }

        if (oldPassword === newPassword) {
            throw Error('Same password')
        }

        if (newPassword !== confirmPassword) {
            throw Error(`New and confirm password don't match`)
        }

        return authRepo.changePassword({
            oldPassword,
            newPassword,
        })
    }

    const forgotPassword = async ({ email }) => {
        if (!email) {
            throw Error('Email cannot be empty')
        }
        if (!ValidateEmail(email)) {
            throw Error('Wrong email format')
        }

        const response = await authRepo.forgotPassword({ email })

        return response
    }

    const resetPassword = async ({ email, code, password }) => {
        if (!email || !code || !password) {
            throw Error('Credentials are required')
        }

        if (!ValidateEmail(email)) {
            throw Error('Wrong email format')
        }

        const response = await authRepo.resetPassword({
            email,
            code,
            password,
        })

        return response
    }

    return {
        signIn,
        signUp,
        signOut,
        confirmCode,
        resetPassword,
        resendConfirmCode,
        forgotPassword,
        changePassword,
    }
}

export default authUseCase
