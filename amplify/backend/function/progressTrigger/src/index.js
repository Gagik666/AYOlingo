const AWS = require('aws-sdk')
const appSyncRequest = require('./functions/appSyncRequest')
const { updateUser } = require('./graphql/mutations') 

/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	APP_SYNC_ENDPOINT
	APP_SYNC_SECRET_KEY
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  for (const record of event.Records) {
    if (record.eventName === 'MODIFY') {
      try {
        const progress = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.NewImage);
        if (progress.modules) {
          const passedLessonsCount = Object.values(progress.modules).reduce((totalCount, module) => {
            return totalCount + Object.values(module.lessons).filter(lesson => parseInt(lesson.progress) === 100).length;
          }, 0);
          console.log('>>> PASSED LESSONS COUNT', passedLessonsCount)
          const updateUserInput = {
            id: progress.id,
            passedLessonsCount,
          }
          const updateUserResponse = await appSyncRequest(updateUser, { input: updateUserInput })
          console.log('>>> UPDATE USER RESPONSE DATA', updateUserResponse.data)
        }
      } catch (e) {
        console.log('>>> ERROR UPDATE EVENT', e)
      }
    }
  }
  return Promise.resolve('Successfully processed DynamoDB record');
};
