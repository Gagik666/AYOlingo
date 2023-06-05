import { useMutation } from 'react-query'
import { authUseCase } from '../../factories'

const useChangePassword = () => {
    const changePassword = useMutation(authUseCase.changePassword)

    return changePassword
}

export default useChangePassword
