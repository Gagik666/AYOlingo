import { useMutation } from 'react-query'
import { authUseCase } from '../../factories'

const useConfirmCode = () => {
    const {
        mutate: confirmCode, isLoading, data, error,
    } = useMutation(authUseCase.confirmCode)

    return {
        confirmCode,
        isLoading,
        error,
        data,
    }
}

export default useConfirmCode
