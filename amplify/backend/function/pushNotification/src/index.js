const appSyncService = require('./helpers/appSyncService')
const { createPushNotification } = require('./graphql/mutations')
const {
    createMessages,
    sendMessages,
    getReceiptIds,
    obtainReceipts,
} = require("./helpers/pushNotification")

exports.handler = async (event, context, callback) => {
    try {
        console.log('>>> EVENT', event);
        const eventBody = event.body ? JSON.parse(event.body) : {title: '', body: '', pushNotificationTokens: []}
        
        try {
            eventBody.pushNotificationTokens = JSON.parse(eventBody.pushNotificationTokens).filter(pushNotificationToken => pushNotificationToken);
        } catch (e) {
            console.log('>>> UNABLE TO PARSE NOTIFICATIONS ARRAY')
        }
        
        console.log(eventBody, ' EVENT BODY')
        console.log('>>> EVENT BODY PUSH NOTIFICATIONS LENGTH', eventBody.pushNotificationTokens.length)
        if (eventBody.title && eventBody.body && eventBody.pushNotificationTokens.length > 0) {
            const messages = createMessages(
                eventBody.title,
                eventBody.body,
                { body: eventBody.body },
                eventBody.pushNotificationTokens,
            )
        
            let tickets = await sendMessages(messages)
        
            let receiptIds = getReceiptIds(tickets)
        
            await obtainReceipts(receiptIds)
        }
    
        // console.log("Created push notification", JSON.stringify(pushNotification.data))
        console.log("Created push notification")

    
        callback(null, 200)
    } catch (e) {
        console.log('>>> ERROR', e);
        callback(Error(e))
    }
};
