import { useMutation } from 'react-query'
import { feedbackUseCase } from '../../factories'

const useCreateFeedback = () => {
    const {
        mutate: createFeedback, isLoading, data, error,
    } = useMutation(feedbackUseCase.createFeedback)

    return {
        createFeedback,
        isLoading,
        error,
        data,
    }
}

export default useCreateFeedback
