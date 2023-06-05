var AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1',
    accessKeyId: '',
    secretAccessKey: '',
})

var params = {
    Destination: {
        CcAddresses: [
            'bokhyan.edmond@gmail.com',
        ],
        ToAddresses: [
            'bokhyan.edmond@gmail.com',
        ]
    },
    Message: {
        Body: {
            Text: {
                Charset: "UTF-8",
                Data: "TEXT_FORMAT_BODY"
            }
        },
        Subject: {
            Charset: 'UTF-8',
            Data: 'Test email'
        }
    },
    Source: 'edmond@monomark.io',
    ReplyToAddresses: [
        'bokhyan.edmond@gmail.com',
    ],
}

var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();

sendPromise.then(
    (data) => {
        console.log(data.MessageId);
    }
).catch(
    (err) => {
        console.error(err, err.stack);
    }
)