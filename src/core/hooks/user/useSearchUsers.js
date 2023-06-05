import { useMutation } from 'react-query'
import { userUseCase } from '../../factories'

const useSearchUsers = () => {
    const {
        mutate: searchUsers, isLoading, data, error,
    } = useMutation(userUseCase.searchUsers)

    return {
        searchUsers,
        isLoading,
        error,
        data,
    }
}

export default useSearchUsers
