import { useMutation } from 'react-query'
import { authUseCase } from '../../factories'

const useResendConfirmCode = () => {
    const {
        mutate: resendConfirmCode, isLoading, data, error,
    } = useMutation(authUseCase.resendConfirmCode)

    return {
        resendConfirmCode,
        isLoading,
        error,
        data,
    }
}

export default useResendConfirmCode
