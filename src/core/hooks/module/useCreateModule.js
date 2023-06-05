import { useMutation } from 'react-query'
import { moduleUseCase } from '../../factories'

const useCreateModule = () => {
    const {
        mutate: createModule, isLoading, data, error,
    } = useMutation(moduleUseCase.createModule)

    return {
        createModule,
        isLoading,
        error,
        data,
    }
}

export default useCreateModule
