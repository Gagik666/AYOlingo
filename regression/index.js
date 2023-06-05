require('dotenv').config()
const moment = require('moment')
const axios = require( "axios");
const cron = require('node-cron');
const { aws4Interceptor } = require("aws4-axios");
const { listModules, listProgresses } = require('./graphql/queries')
const { updateProgress } = require('./graphql/mutations')
const IsJsonString = require('./helpers/isJsonString')
const appSyncService = require('./helpers/appSyncService')

const LIMIT = 50;
let progressCount = 0;

const client = axios.create({
    headers: {
        "Content-Type": "application/json"
    }
});

const interceptor = aws4Interceptor(
    {
      region: "us-east-1",
      service: "es",
    },
    {
      accessKeyId: process.env.AWS_ACCESS_ID,
      secretAccessKey: process.env.AWS_ACCESS_SECRET,
    }
);

client.interceptors.request.use(interceptor);

const getModules = async (modules = [], nextToken = null) => {
    const response = await appSyncService(listModules, { nextToken });
    const newModules = [...modules, ...response.data.data.listModules.items];

    if (response.data.data.listModules.nextToken) {
        return getModules(newModules, response.data.data.listModules.nextToken)
    }
    console.log('>>> NEW MODULES LENGTH', newModules.length);
    return newModules;
}

const getProgresses = async (nextToken = null) => {
    console.log(`progresses: from ${progressCount * LIMIT} to ${progressCount * LIMIT + LIMIT}`)
    const response = await appSyncService(listProgresses, { nextToken, limit: LIMIT });

    const responseItems = response.data.data.listProgresses.items.map(item => ({
        ...item,
        modules: IsJsonString(item.modules) ? JSON.parse(item.modules) : null,
    }))

    progressCount += 1;

    return {
        items: responseItems,
        nextToken: response.data.data.listProgresses.nextToken,
    };
}

const getUsers = async (progresses) => {
    const ids = progresses.map(progress => progress.id);
    const response = await client.post(`${process.env.ELASTIC_ENDPOINT}/user/_search`, {
        size: LIMIT,
        _source: ['id', 'email', 'pushNotificationToken'],
        query: {
            bool: {
                must_not: [
                  {
                    exists: {
                      field: 'deletedAt'
                    }
                  }
                ],
                should: ids.map(id => ({
                    match_phrase: { id }
                }))
            }
        }
    })
    const result = response.data.hits.hits.map(hit => hit._source)
    console.log('>>> USERS', result)
    return result;
}

// COMMENTED THIS CODE AS THERE IS NO NEED TO SEND PUSH NOTIFICATION | UPDATING PROGRESS IN THE FUNCTION WHICH CALLED THIS ONE
// const updateProgressAndSendNotification = async (variables, module) => {
//     try {
//         const response = await appSyncService(updateProgress, {input: {...variables.input, modules: JSON.stringify(variables.input.modules)}})
//         console.log(response, ` response, updated ${module.progressId} progress`)
//         console.log(`>>> USER DETAILS: ${module.user.email} ${module.user.pushNotificationToken}`)
//         if (module.user.pushNotificationToken) {
//             const notificationResponse = await axios.post(process.env.SEND_PUSH_NOTIFICATION_ENDPOINT, {
//                 title: 'Regression',
//                 body: `value is ${variables.input.modules[module.id].regression.points}`,
//                 pushNotificationTokens: [module.user.pushNotificationToken],
//             })
//             console.log('>>> NOTIFICATIONS RESPONSE', notificationResponse)
//         }
//         return Promise.resolve()
//     } catch (e) {
//         return Promise.reject(e)
//     }
// }

const progressesWithUsers = (progressItems, users) =>
    progressItems.map(item => ({
        ...item,
        user: users.find(user => user.id === item.id),
    }))

const getPassedModules = (progresses, modules) => {
    const passedModules = [];

    for (const progress of progresses) {
        if (progress.modules) {
            for (const [moduleId, value] of Object.entries(progress.modules)) {
                if (value.progress === 100) {
                    console.log('>>> MODULES', modules)
                    console.log('>>> MODULE ID', moduleId, progress)
                    const module = modules.find(module => module.id === moduleId);
                    if (module?.regression) {
                        passedModules.push({
                            id: moduleId,
                            userId: progress.id,
                            progressId: progress.id,
                            moduleProgress: value,
                            progress: progress,
                            regression: modules.find(module => module.id === moduleId).regression,
                            user: progress.user,
                        })
                    }
                }
            }
        }
    }

    return passedModules;
}

const handleEverything = async (modules, nextToken = null) => {
    const progressesResponse = await getProgresses(nextToken)
    const users = await getUsers(progressesResponse.items);
    const progresses = progressesWithUsers(progressesResponse.items, users);
    const passedModules = getPassedModules(progresses, modules)
    
    if(passedModules.length === 0) {
        if (progressesResponse.nextToken) {
            return handleEverything(modules, progressesResponse.nextToken)
        }
        return Promise.resolve()
    }
    const currentDate = moment(new Date())
    for (const module of passedModules) {
        const weeksDifference = currentDate.diff(moment(module.moduleProgress.lastLessonCompletedDate), 'weeks')
        const daysDifference = currentDate.diff(moment(module.moduleProgress.lastLessonCompletedDate), 'days')
        console.log('>>> WEEKS DIFFERENCE', weeksDifference);
        console.log('>>> DAYS DIFFERENCE', daysDifference);
        console.log('>>> MODULE PROGRESS MODULES', module.progress.modules)
        console.log('>>> MODULE', module)

        const variables = {
            input: {
                id: module.progress.id,
                modules: {
                    ...module.progress.modules,
                    [module.id]: {
                        ...module.moduleProgress,
                        regression: {
                            isStarted: module.moduleProgress?.regression?.isStarted,
                            points: module.moduleProgress?.regression?.points ? module.moduleProgress.regression.points + module.regression.step : module.regression.step
                        }
                    }
                }
            }
        }
        console.log('>>> VARIABLES', variables)
        if (100 - variables.input.modules[module.id].regression.points >= module.regression.lastPoint) {
            if ((!variables.input.modules[module.id].regression.isStarted && weeksDifference <= module.regression.start) || daysDifference % 7 === 0) {
                variables.input.modules[module.id].regression.isStarted = true
                // await updateProgressAndSendNotification(variables, module)
                await appSyncService(updateProgress, {input: {...variables.input, modules: JSON.stringify(variables.input.modules)}})
                if (progressesResponse.nextToken) {
                    return handleEverything(modules, progressesResponse.nextToken);
                }
                return Promise.resolve()
            }
        }

        if (progressesResponse.nextToken) {
            return handleEverything(modules, progressesResponse.nextToken);
        }
        return Promise.resolve()
    }
}


cron.schedule(
    '0 0 * * *', // every midnight
    async () => {
        try {
            const modules = await getModules();
    
            await handleEverything(modules);
            console.log(`${moment().format('YYYY-MM-DD HH:mm:ss')} - success`)
        } catch (e) {
            console.log(e, ' error')
        }
    }
)
// UNCOMMENT TO RUN IMMEDIATELY
// ;(async () => {
//     try {
//         const modules = await getModules();

//         await handleEverything(modules);
//         console.log(`${moment().format('YYYY-MM-DD HH:mm:ss')} - success`)
//     } catch (e) {
//         console.log(e, ' error')
//     }
// })()
