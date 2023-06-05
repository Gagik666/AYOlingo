import { useMutation } from 'react-query'
import { feedbackUseCase } from '../../factories'

const useDeleteFeedback = () => {
    const {mutate: deleteFeedback, isLoading, data, error} = useMutation(feedbackUseCase.deleteFeedback)

    return {
        deleteFeedback,
        isLoading,
        data,
        error
    }
}

export default useDeleteFeedback
