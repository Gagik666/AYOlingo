import { useMutation } from 'react-query'
import { authUseCase } from '../../factories'

const useForgotPassword = () => {
    const {
        mutate: forgotPassword, isLoading, data, error,
    } = useMutation(authUseCase.forgotPassword)

    return {
        forgotPassword,
        isLoading,
        error,
        data,
    }
}

export default useForgotPassword
