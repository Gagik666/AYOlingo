const feedbackRepo = (feedbackService) => {
    const createFeedback = (input) => feedbackService.createFeedback(input)

    const deleteFeedback = (input) => feedbackService.deleteFeedback(input)

    const listFeedbacks = (variables) => feedbackService.listFeedbacks(variables)

    const getFeedback = (id) => feedbackService.getFeedback(id)

    return {
        createFeedback,
        deleteFeedback,
        getFeedback,
        listFeedbacks,
    }
}

export default feedbackRepo
