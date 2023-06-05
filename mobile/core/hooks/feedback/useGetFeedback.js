import { useMutation } from 'react-query'
import { feedbackUseCase } from '../../factories'

const useGetFeedback = () => {
    const {
        mutate: getFeedback, isLoading, data, error,
    } = useMutation(feedbackUseCase.getFeedback)

    return {
        getFeedback,
        isLoading,
        error,
        data,
    }
}

export default useGetFeedback
