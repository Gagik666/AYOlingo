import { useMutation } from 'react-query'
import { alphabetUseCase } from '../../factories'

const useCreateAlphabet = () => {
    const { mutate: createAlphabet, isLoading, data, error } = useMutation(alphabetUseCase.createAlphabet)

    return {
        createAlphabet,
        isLoading,
        error,
        data,
    }
}

export default useCreateAlphabet
