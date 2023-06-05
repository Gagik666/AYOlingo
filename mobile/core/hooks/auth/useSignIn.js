import { useMutation } from 'react-query'
import { authUseCase } from '../../factories'

const useSignIn = () => {
    const {
        mutate: signIn, isLoading, data, error,
    } = useMutation(authUseCase.signIn)

    return {
        signIn,
        isLoading,
        data,
        error,
    }
}

export default useSignIn
