import { useMutation } from 'react-query'
import { moduleUseCase } from '../../factories'

const useSearchModules = () => {
    const {
        mutate: searchModules, isLoading, data, error,
    } = useMutation(moduleUseCase.searchModules)

    return {
        searchModules,
        isLoading,
        error,
        data,
    }
}

export default useSearchModules
