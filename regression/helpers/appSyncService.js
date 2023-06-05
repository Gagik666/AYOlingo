require('dotenv').config()
const axios = require('axios')

const appSyncService = (query, variables) =>{
    return axios({
        // url: process.env.APP_SYNC_BASE_URL,
        url: 'https://fgojfg67nbdz7petroyjsp5s2y.appsync-api.us-east-1.amazonaws.com/graphql',
        method: 'POST',
        headers: {
            'x-api-key': 'da2-yuugu3z7jbdc7lmbwsedpbtt3a'
            // 'x-api-key': process.env.APP_SYNC_API_KEY
        },
        data: {
            query,
            variables
        }
    })
}
module.exports = appSyncService
