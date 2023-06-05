const axios = require('axios');

exports.handler = async function (event) {
  return new Promise(function (resolve, reject) {
    event.Records.forEach(function (record) {
        const { pushNotificationTokens, title, body } = JSON.parse(record.body)
        console.log('>>> TITLE', title)
        console.log('>>> BODY', body)
        console.log('>>> PUSH NOTIFICATION TOKENS', pushNotificationTokens);
        return axios({
            url: process.env.SEND_PUSH_NOTIFICATION_ENDPOINT,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',  
            },
            data: {
                title,
                body,
                pushNotificationTokens,
            }
        })
        .then((response) => {
            console.log('>>> REQUEST SEND NOTIFICATIONS RESPONSE', response);
            resolve('success')
        })
        .catch(e => {
            console.log('>>> REQUEST SEND NOTIFICATIONS ERROR', e)
            reject(e)
        })
    })
  })
}
