import { useMutation } from 'react-query'
import { vocabularyUseCase } from '../../factories'

const useVocabulary = () => {
    const { mutate: getVocabulary, isLoading, data, error } = useMutation(vocabularyUseCase.getVocabulary)

    return {
        getVocabulary,
        isLoading,
        error,
        data,
    }
}

export default useVocabulary
