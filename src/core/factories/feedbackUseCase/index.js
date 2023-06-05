// import {  } from '../../constants'

const feedbackUseCase = (feedbackRepo) => {
    const createFeedback = (input) => {
        let isValid = true
        const errors = {}

        if (!isValid) {
            throw Error(JSON.stringify(errors))
        }
        return feedbackRepo.createFeedback(input)
    }

    const deleteFeedback = (input) => feedbackRepo.deleteFeedback(input)

    const getFeedback = (id) => {
        if (!id) {
            throw Error('ID is required')
        }

        return feedbackRepo.getFeedback(id)
    }

    const listFeedbacks = (variables) => feedbackRepo.listFeedbacks(variables)

    const searchFeedbacks = (variables) => feedbackRepo.searchFeedbacks(variables)

    return {
        createFeedback,
        getFeedback,
        listFeedbacks,
        deleteFeedback,
        searchFeedbacks,
    }
}

export default feedbackUseCase
