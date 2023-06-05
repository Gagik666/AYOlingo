require('dotenv').config()
const { appSyncRequest } = require('../functions')
const {
    updateUser,
    updateVocabulary,
    updateAudio,
    updateExercises,
    updateModule,
    updateFeedback,
    updatePushNotification,
} = require('../graphql/mutations')

const updateQueries = {
    updateUser,
    updateAudio,
    updateVocabulary,
    updateExercises,
    updateModule,
    updateFeedback,
    updatePushNotification,
}

const LIMIT = 50;

async function migrateElasticData(updateQueryName, outputFileName) {

    if (!updateQueryName) {
        return console.log('>>> UPDATE QUERY NAME IS MISSING')
    }

    if (!outputFileName) {
        return console.log('>>> INPUT FILE NAME IS MISSING')
    }

    if (!updateQueries[updateQueryName]) {
        return console.log('>>> INVALID UPDATE QUERY NAME')
    }
    const data = require(`../output/${outputFileName}`)
    const updateDataQuery = updateQueries[updateQueryName];
    console.log(`updateQueryName: ${updateQueryName}, outputFileName: ${outputFileName}, count: ${data.length}`)
    const updateData = async (cursor = 0) => {
        const from = cursor * LIMIT;
        const to = from + LIMIT;
        console.log(`UPDATING FROM ${from} to ${to}`)
        const updateDataInput = [];

        for (const row of data.slice(from, to)) {
            const dataInput = {
                input: {
                    id: row.id,
                }
            }
    
            updateDataInput.push(dataInput);
        }

        await Promise.all(
            updateDataInput.map(dataInput => appSyncRequest(updateDataQuery, dataInput))
        )

        if (data.length > to) {
            return updateData(cursor + 1);
        }

        console.log('>>> UPDATING SUCCESSFULLY')
    }

    updateData();
}

module.exports = migrateElasticData;
