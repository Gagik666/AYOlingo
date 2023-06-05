require('dotenv').config()
const { appSyncRequest } = require('../functions')
const {
    updateExercises: updateExercisesMutation
} = require('../graphql/mutations')

const LIMIT = 50;

async function migrateExerciseLessonsCount(inputFileName) {
    if (!inputFileName) {
        return console.log('>>> INPUT FILE NAME IS MISSING')
    }

    const data = require(`../output/${inputFileName}`).filter(row => !row.lessonsCount)
    console.log(`inputFileName: ${inputFileName}, count: ${data.length}`)
    const updateExercises = async (cursor = 0) => {
        const from = cursor * LIMIT;
        const to = from + LIMIT;
        console.log(`UPDATING FROM ${from} to ${to}`)
        const updateExerciseInputs = [];

        for (const row of data.slice(from, to)) {
            const updateExerciseInput = {
                input: {
                    id: row.id,
                    lessonsCount: row.lessons.length
                }
            }
            console.log(`ID: ${row.id}, count: ${row.lessons.length}`)
            updateExerciseInputs.push(updateExerciseInput);
        }

        await Promise.all(
            updateExerciseInputs.map(updateExerciseInput => appSyncRequest(updateExercisesMutation, updateExerciseInput))
        )

        if (data.length > to) {
            return updateExercises(cursor + 1);
        }

        console.log('>>> UPDATING SUCCESSFULLY')
    }

    updateExercises();
}

module.exports = migrateExerciseLessonsCount;
