import { useEffect } from 'react'
import { useMutation } from 'react-query'
import { useHistory } from 'react-router-dom'
import useUser from '../user/useUser'
import { authUseCase } from '../../factories'

const useSignOut = () => {
    const history = useHistory()
    const { setUser } = useUser()
    const {
        mutate: signOut, isLoading, data, error,
    } = useMutation(authUseCase.signOut)

    useEffect(() => {
        if (!data) return
        setUser(null)
        history.push('/login')
    }, [data])

    return {
        signOut,
        isLoading,
        data,
        error,
    }
}

export default useSignOut
