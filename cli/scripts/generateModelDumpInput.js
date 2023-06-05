const fs = require('fs');
const appSyncRequest = require('../functions/appSyncRequest');
const queries = require('../graphql/queries');

const LIMIT = 100;
let count = 1;

const getAllItems = (queryName, items = [], nextToken = null) => new Promise(
    async (resolve, reject) => {
        console.log(`request ${count}`)
        const filters = { limit: LIMIT };
        if (nextToken) filters.nextToken = nextToken;
        const response = await appSyncRequest(queries[queryName], filters);
        const {
            items: responseItems,
            nextToken: responseNextToken,
        } = response.data.data[queryName];
        console.log(`response items ${responseItems.length}`)
        console.log(`next token ${responseNextToken}`)

        responseItems.forEach(item => console.log(`item id ${item.id}`))
        const newItems = [...items, ...responseItems];

        if (responseNextToken) {
            count += 1;
            return resolve(getAllItems(queryName, newItems, responseNextToken));
        }

        return resolve(newItems);
})

async function generateModelDumpInput(queryName, outputName) {
    const response = await getAllItems(queryName);

    fs.writeFileSync(`output/${outputName}.json`, JSON.stringify(response), 'utf8')
}

module.exports = generateModelDumpInput;