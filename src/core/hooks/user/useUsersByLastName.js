import { useMutation } from 'react-query'
import { userUseCase } from '../../factories'

const useUsersByLastName = () => {
    const {
        mutate: usersByLastName, isLoading, data, error,
    } = useMutation(userUseCase.usersByLastName)

    return {
        usersByLastName,
        isLoading,
        error,
        data,
    }
}

export default useUsersByLastName
