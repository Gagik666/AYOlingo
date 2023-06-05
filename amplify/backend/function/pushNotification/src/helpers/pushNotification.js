let { Expo } = require('expo-server-sdk')

const expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN })

const createMessages = (title, body, data, pushTokens) => {
  let messages = []
  for (let pushToken of pushTokens) {
    
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`)
      continue
    }
  
    messages.push({
      to: pushToken,
      sound: "default",
      title,
      body,
      data,
    })
  }
  return messages
}
const sendMessages = async (messages) => {
  let chunks = expo.chunkPushNotifications(messages)

  let tickets = []
  for (let chunk of chunks) {
    try {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk)
      tickets.push(...ticketChunk)
    } catch (error) {
      console.error(error, ' error')
    }
  }
  return tickets
}

const getReceiptIds = (tickets) => {

  let receiptIds = []

  for (let ticket of tickets) {
    if (ticket.id) {
      receiptIds.push(ticket.id)
    }
  }

  return receiptIds

}

const obtainReceipts = async (receiptIds) => {

  let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds)
  
  for (let chunk of receiptIdChunks) {

    try {
      let receipts = await expo.getPushNotificationReceiptsAsync(chunk)

      console.log("receipts")

      console.log(receipts)
   
      if (!Array.isArray(receipts)) {

        let receipt = receipts

        if (receipt.status === "ok") {
          continue
        } else if (receipt.status === "error") {

          console.error(`There was an error sending a notification: ${receipt.message}`)

          if (receipt.details && receipt.details.error) {
            console.error(`The error code is ${receipt.details.error}`)
          }
        }
        return
      }
     
      for (let receipt of receipts) {
        if (receipt.status === "ok") {
          continue
        } else if (receipt.status === "error") {

          console.error(`There was an error sending a notification: ${receipt.message}`)

          if (receipt.details && receipt.details.error) {
            console.error(`The error code is ${receipt.details.error}`)
          }
        }
      }
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = {
  createMessages,
  sendMessages,
  getReceiptIds,
  obtainReceipts,
}
