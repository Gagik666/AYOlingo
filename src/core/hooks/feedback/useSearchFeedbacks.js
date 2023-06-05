import { useMutation } from 'react-query'
import { feedbackUseCase } from '../../factories'

const useSearchFeedbacks = () => {
    const {
        mutate: searchFeedbacks, isLoading, data, error,
    } = useMutation(feedbackUseCase.searchFeedbacks)

    return {
        searchFeedbacks,
        isLoading,
        error,
        data,
    }
}

export default useSearchFeedbacks
