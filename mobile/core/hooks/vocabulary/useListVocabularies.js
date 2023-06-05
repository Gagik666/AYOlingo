import { useQuery } from 'react-query'
import { vocabularyUseCase } from '../../factories'

const useListVocabularies = () => {
    const data = useQuery('vocabularies', vocabularyUseCase.listVocabularies, { enabled: false })

    return data
}

export default useListVocabularies
