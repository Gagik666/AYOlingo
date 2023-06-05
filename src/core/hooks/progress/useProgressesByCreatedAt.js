import { useMutation } from 'react-query'
import { progressUseCase } from '../../factories'

const useProgressesByCreatedAt = () => {
    const {
        mutate: progressesByCreatedAt, isLoading, data, error,
    } = useMutation(progressUseCase.progressesByCreatedAt)

    return {
        progressesByCreatedAt,
        isLoading,
        error,
        data,
    }
}

export default useProgressesByCreatedAt
