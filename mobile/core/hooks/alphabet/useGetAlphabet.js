import { useMutation } from 'react-query'
import { alphabetUseCase } from '../../factories'

const useAlphabet = () => {
    const { mutate: getAlphabet, isLoading, data, error } = useMutation(alphabetUseCase.getAlphabet)

    return {
        getAlphabet,
        isLoading,
        error,
        data,
    }
}

export default useAlphabet
