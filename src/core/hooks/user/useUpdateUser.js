import { useMutation } from 'react-query'
import { userUseCase } from '../../factories'

const useUpdateUser = () => {
    const data = useMutation(userUseCase.updateUser)
    return data
}

export default useUpdateUser
