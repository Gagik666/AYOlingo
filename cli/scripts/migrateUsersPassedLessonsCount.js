require('dotenv').config()
const { appSyncRequest } = require('../functions')
const {
    updateUser: updateUserMutation
} = require('../graphql/mutations')

const LIMIT = 50;

async function migrateUsersPassedLessonsCount(inputFileName) {
    if (!inputFileName) {
        return console.log('>>> INPUT FILE NAME IS MISSING')
    }

    const data = require(`../output/${inputFileName}`).filter(row => row.modules)
    console.log(`inputFileName: ${inputFileName}, count: ${data.length}`)
    const updateUser = async (cursor = 0) => {
        const from = cursor * LIMIT;
        const to = from + LIMIT;
        console.log(`UPDATING FROM ${from} to ${to}`)
        const updateUsers = [];

        for (const row of data.slice(from, to)) {
            const passedLessonsCount = Object.values(JSON.parse(row.modules)).reduce((totalCount, module) => {
                return totalCount + Object.values(module.lessons).filter(lesson => parseInt(lesson.progress) === 100).length;
            }, 0);

            const updateUser = {
                input: {
                    id: row.id,
                    passedLessonsCount,
                }
            }
            console.log(`ID: ${row.id}, passedLessonsCount: ${passedLessonsCount}`)
            updateUsers.push(updateUser);
        }

        await Promise.all(
            updateUsers.map(updateUser => appSyncRequest(updateUserMutation, updateUser))
        )

        if (data.length > to) {
            return updateUser(cursor + 1);
        }

        console.log('>>> UPDATING SUCCESSFULLY')
    }

    updateUser();
}

module.exports = migrateUsersPassedLessonsCount;
