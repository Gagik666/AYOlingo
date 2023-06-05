import { useMutation } from 'react-query'
import { userUseCase } from '../../factories'

const useListUsers = () => {
    const {
        mutate: listUsers, isLoading, data, error,
    } = useMutation(userUseCase.listUsers)

    return {
        listUsers,
        isLoading,
        error,
        data,
    }
}

export default useListUsers
