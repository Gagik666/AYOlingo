import { useMutation } from 'react-query'
import { userUseCase } from '../../factories'

const useUsersByFirstName = () => {
    const {
        mutate: usersByFirstName, isLoading, data, error,
    } = useMutation(userUseCase.usersByFirstName)

    return {
        usersByFirstName,
        isLoading,
        error,
        data,
    }
}

export default useUsersByFirstName
