import { useMutation } from 'react-query'
import { progressUseCase } from '../../factories'

const useGetProgress = () => {
    const {
        mutate: getProgress, isLoading, data, error,
    } = useMutation(progressUseCase.getProgress)

    return {
        getProgress,
        isLoading,
        error,
        data,
    }
}

export default useGetProgress
