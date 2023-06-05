require('dotenv').config()
const { appSyncRequest } = require('../functions')
const { updateProgress: updateProgressMutation } = require('../graphql/mutations')
const users = require('../output/users.json')

const LIMIT = 50;

async function migrateProgressWithUserDetails(inputFileName) {
    if (!inputFileName) {
        return console.log('>>> INPUT FILE NAME IS MISSING')
    }

    const progresses = require(`../output/${inputFileName}`)
    console.log(`inputFileName: ${inputFileName}, count: ${progresses.length}`)
    const updateProgress = async (cursor = 0) => {
        const from = cursor * LIMIT;
        const to = from + LIMIT;
        console.log(`UPDATING FROM ${from} to ${to}`)
        const updateProgressInputs = [];

        for (const row of progresses.slice(from, to)) {
            const user = users.find(u => u.id === row.id)
            const updateProgressInput = {
                input: {
                    id: row.id,
                    type: 'Progress',
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                }
            }
            console.log(`ID: ${row.id}`)
            updateProgressInputs.push(updateProgressInput);
        }

        await Promise.all(
            updateProgressInputs.map(updateProgressInput => appSyncRequest(updateProgressMutation, updateProgressInput))
        )

        if (progresses.length > to) {
            return updateProgress(cursor + 1);
        }

        console.log('>>> UPDATING SUCCESSFULLY')
    }

    updateProgress();
}

module.exports = migrateProgressWithUserDetails;
