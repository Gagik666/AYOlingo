import { useMutation } from 'react-query'
import { userUseCase } from '../../factories'

const useCreateUser = () => {
    const {
        mutate: createUser, isLoading, data, error,
    } = useMutation(userUseCase.createUser)

    return {
        createUser,
        isLoading,
        error,
        data,
    }
}

export default useCreateUser
