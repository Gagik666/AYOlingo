require('dotenv').config()
const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-1',
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
})

module.exports = function (body) {
    const { from, to, cc, reply, link } = JSON.parse(body)
    
    const params = {
        Destination: {
            CcAddresses: cc || [],
            ToAddresses: to
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: `
                        <a href="${link}">You can register here</a>
                    `
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Test email'
            }
        },
        Source: from,
        ReplyToAddresses: reply || [],
    }
    return new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise()
}
