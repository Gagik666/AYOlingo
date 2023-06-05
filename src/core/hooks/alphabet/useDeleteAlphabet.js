import { useMutation } from 'react-query'
import { alphabetUseCase } from '../../factories'

const useDeleteAlphabet = () => {
    const {mutate: deleteAlphabet, isLoading, data, error} = useMutation(alphabetUseCase.deleteAlphabet)

    return {
        deleteAlphabet,
        isLoading,
        data,
        error
    }
}

export default useDeleteAlphabet
