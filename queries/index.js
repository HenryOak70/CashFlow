const genericQueries = require('./generic');
const transactionsQueries = require('./transactions');
const entitiesQueries = require('./entities');

module.exports = {
    ...genericQueries,
    ...transactionsQueries,
    ...entitiesQueries,
    // ... add more queries as needed
};