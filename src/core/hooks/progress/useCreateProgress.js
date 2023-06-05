import { useMutation } from 'react-query'
import { progressUseCase } from '../../factories'

const useCreateProgress = () => {
    const {
        mutate: createProgress, isLoading, data, error,
    } = useMutation(progressUseCase.createProgress)

    return {
        createProgress,
        isLoading,
        error,
        data,
    }
}

export default useCreateProgress
