const pushNotificationRepo = (pushNotificationService) => {
    const sendPushNotification = (input) => pushNotificationService.sendPushNotification(input)

    const createPushNotification = (input) => pushNotificationService.createPushNotification(input)

    const deletePushNotification = (input) => pushNotificationService.deletePushNotification(input)

    const listPushNotifications = (variables) => pushNotificationService.listPushNotifications(variables)

    const searchPushNotifications = (variables) => pushNotificationService.searchPushNotifications(variables)

    const listPushNotificationsByCreatedAt = (variables) => pushNotificationService.listPushNotificationsByCreatedAt(variables)

    const getPushNotification = (id) => pushNotificationService.getPushNotification(id)

    return {
        sendPushNotification,
        createPushNotification,
        deletePushNotification,
        getPushNotification,
        searchPushNotifications,
        listPushNotifications,
        listPushNotificationsByCreatedAt,
    }
}

export default pushNotificationRepo
