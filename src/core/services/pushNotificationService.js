import { API, graphqlOperation } from 'aws-amplify'
import axios from 'axios'
import {
    createPushNotification as createPushNotificationMutation,
    deletePushNotification as deletePushNotificationMutation,
} from '../../graphql/mutations'
import {
    getPushNotification as getPushNotificationQuery,
    listPushNotifications as listPushNotificationsQuery,
    searchPushNotifications as searchPushNotificationsQuery,
    pushNotificationsByCreatedAt as listPushNotificationsByCreatedAtQuery
} from '../../graphql/queries'
import { SEND_PUSH_NOTIFICATION_URL } from '../constants'

const pushNotificationService = () => {
    const sendPushNotification = (input) => axios({
        url: SEND_PUSH_NOTIFICATION_URL,
        method: 'POST',
        data: {...input},
    })

    const createPushNotification = (input) => API.graphql(
        graphqlOperation(createPushNotificationMutation, { input }),
    )

    const deletePushNotification = (input) => API.graphql(
        graphqlOperation(deletePushNotificationMutation, { input }),
    )

    const getPushNotification = (id) => API.graphql(
        graphqlOperation(getPushNotificationQuery, { id }),
    )

    const listPushNotifications = (variables) => API.graphql(
        graphqlOperation(listPushNotificationsQuery, variables),
    )

    const searchPushNotifications = (variables) => API.graphql(
        graphqlOperation(searchPushNotificationsQuery, variables),
    )

    const listPushNotificationsByCreatedAt = (variables) => API.graphql(
        graphqlOperation(listPushNotificationsByCreatedAtQuery, variables),
    )

    return {
        sendPushNotification,
        createPushNotification,
        getPushNotification,
        searchPushNotifications,
        listPushNotifications,
        listPushNotificationsByCreatedAt,
        deletePushNotification,
    }
}

export default pushNotificationService
