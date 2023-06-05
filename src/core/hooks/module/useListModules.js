import { useMutation } from 'react-query'
import { moduleUseCase } from '../../factories'

const useListModules = () => {
    const {
        mutate: listModules, isLoading, data, error,
    } = useMutation(moduleUseCase.listModules)

    return {
        listModules,
        isLoading,
        error,
        data,
    }
}

export default useListModules
