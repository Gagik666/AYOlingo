const axios = require('axios')

const appSyncService = (query, variables) =>
    axios({
        url: process.env.APP_SYNC_BASE_URL,
        method: 'POST',
        headers: {
            'x-api-key': process.env.APP_SYNC_API_KEY
        },
        data: {
            query,
            variables
        }
    })

module.exports = appSyncService
