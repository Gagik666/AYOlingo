import { useMutation } from 'react-query'
import { vocabularyUseCase } from '../../factories'

const useSearchVocabularies = () => {
    const {
        mutate: searchVocabularies, isLoading, data, error,
    } = useMutation(vocabularyUseCase.searchVocabularies)

    return {
        searchVocabularies,
        isLoading,
        error,
        data,
    }
}

export default useSearchVocabularies
