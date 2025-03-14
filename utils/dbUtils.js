// --- import queries from queries folder
const queries = require('../queries');
// --- import error handling from errors folder
const errors = require('../errors');

async function checkTableExists(pool, tableName) {
    try {
        const result = await pool.query(queries.checkTableExists, [tableName]);

        // --- ensure the query returs a valid response
        if (result.rows.length === 0) {
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

        const result = await pool.query(query, params);
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