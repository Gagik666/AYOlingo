import { useMutation } from 'react-query'
import { alphabetUseCase } from '../../factories'

const useUpdateAlphabet = () => {
    const {
        mutate: updateAlphabet, isLoading, data, error,
    } = useMutation(alphabetUseCase.updateAlphabet)

    return {
        updateAlphabet,
        isLoading,
        error,
        data,
    }
}

export default useUpdateAlphabet
