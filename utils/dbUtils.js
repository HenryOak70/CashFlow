// --- import queries from queries folder
const queries = require('../queries');
// --- import error handling from errors folder
const errors = require('../errors');

async function checkTableExists(pool, table) {
    try {
        console.log('DEBUG: pool =', pool);
    // ###DEBUG LOG ### check if the query is working
        console.log(`Executing query: ${queries.checkTableExists} with params:`, [table]);
        const result = await pool.query(queries.checkTableExists, [table]);
        console.log(`Query result:`, result);

        // --- ensure the query returns a valid response
        if (!result || !result.rows) {
    // ###DEBUG LOG ### check if the result is undefined
            console.error("Query returned undefined or null result:", result);
            return { error: errors.MSG_TABLE_NOT_FOUND };
        }

        return { exists: result.rows[0].exists };
    } catch (err) {
        console.error(errors.MSG_DB_QUERY_ERROR, err);
        return {
            error: errors.MSG_DB_QUERY_ERROR,
            details: err.message,
        };
    }
}

async function fetchData(pool, tableName, query, params = []) {
    try {
        const tableExists = await checkTableExists(pool, tableName);
        if(tableExists.error) {
            return tableExists;
        }

    // ###DEBUG LOG ### check if the query is running correctly
        console.log(`Executing query: ${query} with params:`. params);
        const result = await pool.query(query, params);
        console.log(`Query result:`. result);

        return result.rows;
    } catch (err) {
        console.error(errors.MSG_DB_QUERY_ERROR, err);
        return {
            error: errors.MSG_INTERNAL_ERROR,
            details: err.message,
        };
    }
}

async function getTransactionById(pool, tableName, transactionId) {
    try {
        const tableExists = await checkTableExists(pool, tableName);
        if(tableExists.error) {
            return tableExists;
        }

        const query = queries.getById(tableName);
        const result = await pool.query(query, [transactionId]);

        if (result.rows.length === 0) {
            return { error: errors.MSG_TRANSACTION_NOT_FOUND };
        }

        return result.rows[0];
    } catch (err) {
        console.error(errors.MSG_DB_QUERY_ERROR, err);
        return {
            error: errors.MSG_INTERNAL_ERROR,
            details: err.message
        };
    }
}

async function insertData(pool, tableName, data) {
    try {
        const tableExists = await checkTableExists(pool, tableName);
        if (tableExists.error) {
            return tableExists;
        }

        const columns = Object.keys(data);
        const values = Object.values(data);
        const query = queries.insert(tableName, columns);

        const result = await pool.query(query, values);
        return result.rows[0];

    } catch (err) {
        console.error(errors.MSG_DB_QUERY_ERROR, err);
        return {
            error: errors.MSG_INTERNAL_ERROR,
            details: err.message,
        };
    }
}

module.exports = { checkTableExists, fetchData, getTransactionById, insertData };