import { useMutation } from 'react-query'
import { vocabularyUseCase } from '../../factories'

const useUpdateVocabulary = () => {
    const {
        mutate: updateVocabulary, isLoading, data, error,
    } = useMutation(vocabularyUseCase.updateVocabulary)

    return {
        updateVocabulary,
        isLoading,
        error,
        data,
    }
}

export default useUpdateVocabulary
