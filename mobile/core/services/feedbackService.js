import { API, graphqlOperation } from 'aws-amplify'
import {
    createFeedback as createFeedbackMutation,
    deleteFeedback as deleteFeedbackMutation,
} from '../../graphql/mutations'
import {
    getFeedback as getFeedbackQuery,
    listFeedbacks as listFeedbacksQuery,
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

    return {
        createFeedback,
        getFeedback,
        listFeedbacks,
        deleteFeedback,
    }
}

export default feedbackService
