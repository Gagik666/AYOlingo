import { useMutation } from 'react-query'
import { authUseCase } from '../../factories'

const useResetPassword = () => {
    const {
        mutate: resetPassword, isLoading, data, error,
    } = useMutation(authUseCase.resetPassword)

    return {
        resetPassword,
        isLoading,
        error,
        data,
    }
}

export default useResetPassword
