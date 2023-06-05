import { useQuery } from 'react-query'
import { vocabularyUseCase } from '../../factories'

const useSearchVocabularies = (variables) => {
    const query = useQuery(['search-vocabularies', variables], vocabularyUseCase.searchVocabularies, { enabled: false })

    return query
}

export default useSearchVocabularies
