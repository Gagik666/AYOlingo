import { useMutation } from 'react-query'
import { moduleUseCase } from '../../factories'

const useModulesByCreatedAt = () => {
    const {
        mutate: modulesByCreatedAt, isLoading, data, error,
    } = useMutation(moduleUseCase.modulesByCreatedAt)

    return {
        modulesByCreatedAt,
        isLoading,
        error,
        data,
    }
}

export default useModulesByCreatedAt
