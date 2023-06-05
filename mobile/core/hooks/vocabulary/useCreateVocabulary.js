import { useMutation } from 'react-query'
import { vocabularyUseCase } from '../../factories'

const useCreateVocabulary = () => {
    const { mutate: createVocabulary, isLoading, data, error } = useMutation(vocabularyUseCase.createVocabulary)

    return {
        createVocabulary,
        isLoading,
        error,
        data,
    }
}

export default useCreateVocabulary
