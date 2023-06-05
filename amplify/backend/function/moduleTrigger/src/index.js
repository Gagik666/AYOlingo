const AWS = require('aws-sdk');
const appSyncRequest = require('./functions/appSyncRequest');
const { exercisesByModule } = require('./graphql/queries');
const { deleteExercises } = require('./graphql/mutations');

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  for (const record of event.Records) {
    if (record.eventName === 'REMOVE') {
      const module = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.OldImage);
      console.log('>>> MODULE', module)
      const exerciseResponse = await appSyncRequest(exercisesByModule, { module: module.id })
      console.log('>>> EXERCISE RESPONSE', exerciseResponse.data)
      const exercise = exerciseResponse.data.data.exercisesByModule.items[0]
      console.log('>>> EXERCISE', exerciseResponse.data.data.exercisesByModule)
      const deleteExerciseResponse = await appSyncRequest(deleteExercises, { input: { id: exercise.id } })
      console.log('>>> DELETE EXERCISE RESPONSE', deleteExerciseResponse);
    }
  }
  return Promise.resolve('Successfully processed DynamoDB record');
};
