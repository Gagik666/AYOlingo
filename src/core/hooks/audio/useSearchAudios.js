import { useMutation } from 'react-query'
import { audioUseCase } from '../../factories'

const useSearchAudios = () => {
    const {
        mutate: searchAudios, isLoading, data, error,
    } = useMutation(audioUseCase.searchAudios)

    return {
        searchAudios,
        isLoading,
        error,
        data,
    }
}

export default useSearchAudios
