// --- import queries from queries folder
const queries = require('../queries');

async function checkTableExists(pool, tableName) {
    try {
        const result = await pool.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables
                WHERE table_schema = 'public'
                AND table_name = $1
            )`,
            [tableName]);
        return result.rows[0].exists;
    } catch (err) {
        console.error(err);
        return false;
    }
}

async function fetchData(pool, tableName, query, params = []) {
    try {
        const tableExists = await checkTableExists(pool, tableName);
        if(tableExists) {
            const result = await pool.query(query, params);
            return result.rows;
        } else {
            return null;
        }
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function getTransactionById(pool, tableName, transactionId) {
    try {
        const tableExists = await checkTableExists(pool, tableName);
        if(tableExists) {
            const query = queries.qryById(tableName);
            const result = await pool.query(query, [transactionId]);
            return result.rows;
        } else {
            return null;
        }
    } catch (err) {
        console.error(err);
        return null;
    }
}

module.exports = { checkTableExists, fetchData, getTransactionById };