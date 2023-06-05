import { useMutation } from 'react-query'
import { moduleUseCase } from '../../factories'

const useUpdateModule = () => {
    const {
        mutate: updateModule, isLoading, data, error,
    } = useMutation(moduleUseCase.updateModule)

    return {
        updateModule,
        isLoading,
        error,
        data,
    }
}

export default useUpdateModule
