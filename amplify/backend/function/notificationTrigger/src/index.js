const AWS = require('aws-sdk');
const { SNSClient, PublishCommand } = require('@aws-sdk/client-sns')
const sns = new SNSClient({ region: process.env.REGION })

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  for (const record of event.Records) {
    if (record.eventName === 'INSERT') {
      const notification = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.NewImage);
      console.log('>>> NOTIFICATION', notification)
      const params = {
        TopicArn: process.env.SNS_TOPIC_ARN,
        Message: JSON.stringify({
          title: notification.title,
          body: notification.body,
          nextToken: null,
        }),
      }
  
      try {
        const data = await sns.send(new PublishCommand(params))
        const response = {
          statusCode: 200,
          body: JSON.stringify(data),
        }
        return response
      } catch (err) {
        console.log('Error', err.stack)
      }
    }
  }
  // return Promise.resolve('Successfully processed DynamoDB record');
};
