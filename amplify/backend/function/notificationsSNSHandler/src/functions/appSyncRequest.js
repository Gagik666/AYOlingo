const axios = require('axios');

module.exports = (query, variables) =>
    axios({
        url: process.env.APP_SYNC_ENDPOINT,
        method: 'POST',
        headers: {
            'x-api-key': process.env.APP_SYNC_SECRET_KEY
        },
        data: {
            query,
            variables,
        },
    })
