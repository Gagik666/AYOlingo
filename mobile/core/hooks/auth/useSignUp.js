import { useMutation } from 'react-query'
import { authUseCase } from '../../factories'

const useSignUp = () => {
    const {
        mutate: signUp, isLoading, data, error,
    } = useMutation(authUseCase.signUp)

    return {
        signUp,
        isLoading,
        error,
        data,
    }
}

export default useSignUp
