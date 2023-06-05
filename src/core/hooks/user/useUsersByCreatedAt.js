import { useMutation } from 'react-query'
import { userUseCase } from '../../factories'

const useUsersByCreatedAt = () => {
    const {
        mutate: usersByCreatedAt, isLoading, data, error,
    } = useMutation(userUseCase.usersByCreatedAt)

    return {
        usersByCreatedAt,
        isLoading,
        error,
        data,
    }
}

export default useUsersByCreatedAt
