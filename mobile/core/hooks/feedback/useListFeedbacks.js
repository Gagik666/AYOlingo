import { useMutation } from 'react-query'
import { feedbackUseCase } from '../../factories'

const useListFeedbacks = () => {
    const {
        mutate: listFeedbacks, isLoading, data, error,
    } = useMutation(feedbackUseCase.listFeedbacks)

    return {
        listFeedbacks,
        isLoading,
        error,
        data,
    }
}

export default useListFeedbacks
