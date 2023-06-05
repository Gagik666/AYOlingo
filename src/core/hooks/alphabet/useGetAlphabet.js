import { useMutation } from 'react-query'
import { alphabetUseCase } from '../../factories'

const useGetAlphabet = () => {
    const { mutate: getAlphabet, isLoading, data, error } = useMutation(alphabetUseCase.getAlphabet)

    return {
        getAlphabet,
        isLoading,
        error,
        data,
    }
}

export default useGetAlphabet
