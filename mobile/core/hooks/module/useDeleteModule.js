import { useMutation } from 'react-query'
import { moduleUseCase } from '../../factories'

const useDeleteModule = () => {
    const {mutate: deleteModule, isLoading, data, error} = useMutation(moduleUseCase.deleteModule)

    return {
        deleteModule,
        isLoading,
        data,
        error
    }
}

export default useDeleteModule
