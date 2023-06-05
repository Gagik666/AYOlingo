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

    const signUp = async ({ avatar, firstName, lastName, email, password, confirm_password, validate = true }) => {
        let isValid = true
        const errors = {}
        if (!firstName && validate) {
            errors.firstName = FIRST_NAME_IS_REQUIRED
            isValid = false
        }
        if (!lastName && validate) {
            errors.lastName = LAST_NAME_IS_REQUIRED
            isValid = false
        }
        if (!email && validate) {
            errors.email = EMAIL_ADDRESS_IS_REQUIRED
            isValid = false
        }
        if (!password && validate) {
            errors.password = PASSWORD_IS_REQUIRED
            isValid = false
        }
        if (!confirm_password && validate) {
            errors.confirm_password = CONFIRM_PASSWORD_IS_REQUIRED
            isValid = false
        }
        if (validate && password && confirm_password && password !== confirm_password) {
            errors.confirm_password = PASSWORDS_DONT_MATCH
            errors.passwords_dont_match = PASSWORDS_DONT_MATCH
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
            avatar,
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

        return authRepo.confirmCode({ email, code, })
    }

    const resendConfirmCode = ({ email }) => {
        if (!ValidateEmail(email)) {
            throw Error('Wrond email format')
        }

        return authRepo.resendConfirmCode({ email })
    }

    const changePassword = ({ oldPassword, confirmPassword, newPassword }) => {
        if (!oldPassword || !newPassword || !confirmPassword) {
            throw Error('Credentials are required')
        }

        if (oldPassword === newPassword) {
            throw Error('Same password')
        }

        if (confirmPassword !== newPassword) {
            throw Error(`New and confirm passwords don't match`)
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
