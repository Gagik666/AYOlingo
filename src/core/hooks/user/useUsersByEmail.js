import { useMutation } from 'react-query'
import { userUseCase } from '../../factories'

const useUsersByEmail = () => {
    const {
        mutate: usersByEmail, isLoading, data, error,
    } = useMutation(userUseCase.usersByEmail)

    return {
        usersByEmail,
        isLoading,
        error,
        data,
    }
}

export default useUsersByEmail
