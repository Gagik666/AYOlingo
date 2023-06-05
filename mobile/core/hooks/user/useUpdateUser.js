import { useMutation } from 'react-query'
import { userUseCase } from '../../factories'

const useUpdateUser = () => {
    const updateUser = useMutation(userUseCase.updateUser)

    return updateUser
}

export default useUpdateUser
