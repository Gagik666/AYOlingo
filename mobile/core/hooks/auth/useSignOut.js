import { useMutation } from 'react-query'
import { authUseCase } from '../../factories'

const useSignOut = () => {
    const { mutate: signOut, isLoading, data, error, } = useMutation(authUseCase.signOut)

    return {
        signOut,
        isLoading,
        data,
        error,
    }
}

export default useSignOut
