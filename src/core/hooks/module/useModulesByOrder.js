import { useMutation } from 'react-query'
import { moduleUseCase } from '../../factories'

const useModulesByOrder = () => {
    const {
        mutate: modulesByOrder, isLoading, data, error,
    } = useMutation(moduleUseCase.modulesByOrder)

    return {
        modulesByOrder,
        isLoading,
        error,
        data,
    }
}

export default useModulesByOrder
