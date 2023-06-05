import { useMutation } from 'react-query'
import { alphabetUseCase } from '../../factories'

const useListAlphabets = () => {
    const {
        mutate: listAlphabets, isLoading, data, error,
    } = useMutation(alphabetUseCase.listAlphabets)

    return {
        listAlphabets,
        isLoading,
        error,
        data,
    }
}

export default useListAlphabets
