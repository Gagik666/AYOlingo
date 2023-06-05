const feedbackRepo = (feedbackService) => {
    const createFeedback = (input) => feedbackService.createFeedback(input)

    const deleteFeedback = (input) => feedbackService.deleteFeedback(input)

    const listFeedbacks = (variables) => feedbackService.listFeedbacks(variables)

    const searchFeedbacks = (variables) => feedbackService.searchFeedbacks(variables)

    const getFeedback = (id) => feedbackService.getFeedback(id)

    return {
        createFeedback,
        deleteFeedback,
        getFeedback,
        listFeedbacks,
        searchFeedbacks,
    }
}

export default feedbackRepo
