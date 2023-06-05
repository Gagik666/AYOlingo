import { API, graphqlOperation } from 'aws-amplify'
import {
    createFeedback as createFeedbackMutation,
    deleteFeedback as deleteFeedbackMutation,
} from '../../graphql/mutations'
import {
    getFeedback as getFeedbackQuery,
    listFeedbacks as listFeedbacksQuery,
    searchFeedbacks as searchFeedbacksQuery,
} from '../../graphql/queries'

const feedbackService = () => {
    const createFeedback = (input) => API.graphql(
        graphqlOperation(createFeedbackMutation, { input }),
    )

    const deleteFeedback = (input) => API.graphql(
        graphqlOperation(deleteFeedbackMutation, { input }),
    )

    const getFeedback = (id) => API.graphql(
        graphqlOperation(getFeedbackQuery, { id }),
    )

    const listFeedbacks = (variables) => API.graphql(
        graphqlOperation(listFeedbacksQuery, variables),
    )

    const searchFeedbacks = (variables) => API.graphql(
        graphqlOperation(searchFeedbacksQuery, variables),
    )

    return {
        createFeedback,
        getFeedback,
        listFeedbacks,
        searchFeedbacks,
        deleteFeedback,
    }
}

export default feedbackService
