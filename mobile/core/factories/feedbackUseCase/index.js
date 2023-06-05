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
            throw Error('Get feedback: ID is required')
        }

        return feedbackRepo.getFeedback(id)
    }

    const listFeedbacks = (variables) => feedbackRepo.listFeedbacks(variables)

    return {
        createFeedback,
        getFeedback,
        listFeedbacks,
        deleteFeedback,
    }
}

export default feedbackUseCase
