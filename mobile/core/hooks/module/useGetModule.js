import { useMutation } from 'react-query'
import { moduleUseCase } from '../../factories'

const useGetModule = () => {
    const {
        mutate: getModule, isLoading, data, error,
    } = useMutation(moduleUseCase.getModule)

    return {
        getModule,
        isLoading,
        error,
        data,
    }
}

export default useGetModule
