import { useMutation } from 'react-query'
import { authUseCase } from '../../factories'

const useChangePassword = () => {
    const data = useMutation(authUseCase.changePassword)
    return data
}

export default useChangePassword
