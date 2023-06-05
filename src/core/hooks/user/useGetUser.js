import { useMutation } from 'react-query'
import { userUseCase } from '../../factories'

const useGetUser = () => {
    const {
        mutate: getUser, isLoading, data, error,
    } = useMutation(userUseCase.getUser)

    return {
        getUser,
        isLoading,
        error,
        data,
    }
}

export default useGetUser
