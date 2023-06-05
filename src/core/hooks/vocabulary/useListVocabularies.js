import { useMutation } from 'react-query'
import { vocabularyUseCase } from '../../factories'

const useListVocabularies = () => {
    const {
        mutate: listVocabularies, isLoading, data, error,
    } = useMutation(vocabularyUseCase.listVocabularies)

    return {
        listVocabularies,
        isLoading,
        error,
        data,
    }
}

export default useListVocabularies
