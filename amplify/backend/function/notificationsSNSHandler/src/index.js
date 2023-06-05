const AWS = require('aws-sdk');
const { SNSClient, PublishCommand } = require('@aws-sdk/client-sns')
const appSyncRequest = require('./functions/appSyncRequest');
const { listUsers } = require('./graphql/queries');

AWS.config.update({ region: process.env.REGION })

const sqs = new AWS.SQS({ apiVersion: '2012-11-05' })
const sns = new SNSClient({ region: process.env.REGION })
const LIMIT = 50;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    for (const record of event.Records) {
        console.log('>>> record', record);
        const message = JSON.parse(record.Sns.Message);
        const count = message.count || 1;
        console.log(`>>> LOADING FROM ${(count - 1) * LIMIT} TO ${count * LIMIT}`)
        console.log('>>> message', message);
        const response = await appSyncRequest(listUsers, {
          limit: LIMIT,
          nextToken: message.nextToken,
          filter: {
            pushNotificationToken: {
              attributeType: 'string'
            },
            // APP SYNC THROWS ERROR, WILL FILTER IN RESPONSE
          },
        })
        const responseToken = response.data.data.listUsers.nextToken;
        const items = response.data.data.listUsers.items.filter(item => !item.deletedAt)
        console.log('>>> RESPONSE', response.data);
        console.log('>>> RESPONSE ITEMS LENGTH', items.length);
        if (items.length > 0) {
          await sendMessage({
            pushNotificationTokens: JSON.stringify(items.map((user) => user.pushNotificationToken)),
            title: message.title,
            body: message.body,
          })
        }

        if (responseToken) {
            try {
                const params = {
                    TopicArn: process.env.SNS_TOPIC_ARN,
                    Message: JSON.stringify({
                        title: message.title,
                        body: message.body,
                        nextToken: responseToken,
                        count: count + 1,
                    }),
                }
                const data = await sns.send(new PublishCommand(params))
                const response = {
                    statusCode: 200,
                    body: JSON.stringify(data),
                }
                return response
            } catch (err) {
                console.log('Error', err.stack)
                return {
                    statusCode: err.statusCode,
                }
            }
        }
    }
    return {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
};

const sendMessage = (data) => {
    var queueURL = process.env.SQS_QUEUE_URL
    console.log('>>> DATA', data);
    var params = {
      QueueUrl: queueURL,
      MessageBody: JSON.stringify(data),
      MessageDeduplicationId: Date.now() + '',
      MessageGroupId: 'UpdatePosted',
      MessageAttributes: {
        title: {
          DataType: 'String',
          StringValue: data.title,
        },
        body: {
          DataType: 'String',
          StringValue: data.body,
        },
        pushNotificationTokens: {
          DataType: 'String',
          StringValue: data.pushNotificationTokens,
        },
      },
    }
  
    sqs.sendMessage(params, function (err, data) {
      if (err) {
        console.log(err, err.stack) // an error occurred
      } else {
        console.log(data) // successful response
      }
    })
}
