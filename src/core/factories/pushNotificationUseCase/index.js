import {
    TITLE_IS_REQUIRED,
    BODY_IS_REQUIRED,
} from '../../constants'

const pushNotificationUseCase = (pushNotificationRepo) => {
    const sendPushNotification = (input) => {
        let isValid = true
        const errors = {}
        if (!input.title) {
            errors.title = TITLE_IS_REQUIRED
            isValid = false
        }
        if (!input.body) {
            errors.body = BODY_IS_REQUIRED
            isValid = false
        }
        if (!isValid) {
            throw Error(JSON.stringify(errors))
        }
        return pushNotificationRepo.sendPushNotification(input)
    }

    const createPushNotification = (input) => pushNotificationRepo.createPushNotification(input)

    const deletePushNotification = (input) => pushNotificationRepo.deletePushNotification(input)

    const getPushNotification = (id) => {
        if (!id) {
            throw Error('ID is required')
        }

        return pushNotificationRepo.getPushNotification(id)
    }

    const searchPushNotifications = (variables) => pushNotificationRepo.searchPushNotifications(variables)

    const listPushNotifications = (variables) => pushNotificationRepo.listPushNotifications(variables)

    const listPushNotificationsByCreatedAt = (variables) => pushNotificationRepo.listPushNotificationsByCreatedAt(variables)

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

export default pushNotificationUseCase
