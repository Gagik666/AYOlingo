import { useMutation } from 'react-query'
import { vocabularyUseCase } from '../../factories'

const useDeleteVocabulary = () => {
    const {mutate: deleteVocabulary, isLoading, data, error} = useMutation(vocabularyUseCase.deleteVocabulary)

    return {
        deleteVocabulary,
        isLoading,
        data,
        error
    }
}

export default useDeleteVocabulary
