const express = require('express');
const router = express.Router();
// --- import the data pool from the server.js file
const { pool } = require('../server');
// --- import functions from dbUtils.js file
const { fetchData } = require('../utils/dbUtils');
// --- import queries from queries folder
const queries = require('../queries');
// --- import error handling from errors folder
const errors = require('../errors');

router.get('/', async (req, res) => {
    try {
        const data = await fetchData(pool, 'tblTransactions', queries.qryAllFromTable);
    // --- send the data if exists
        res.json(data);
    } catch (err) {
        if (err.message.includes(errors.MSG_TABLE_NOT_FOUND)) {
        // --- send message for table not found
            res.status(errors.HTTP_STATUS.NOT_FOUND).send(err.MSG_TABLE_NOT_FOUND);
        } else {
        // --- send message for other errors
            res.status(errors.HTTP_STATUS.HTTP_INTERNAL_SERVER_ERROR).send(errors.MSG_INTERNAL_ERROR);
        }
    }
});

router.get('/:id', async (req, res) => {
    try {
        const transactionId = parseInt(req.params.id);
        const tableName = 'tblTransactions';
        const query = queries.qryById.replace('${tableName}', tableName);
        // --- Add query parameter and transactionId
        const data = await fetchData(pool, tableName, query, [transactionId]);
        if (data && data.length > 0) {
            res.json(data[0]);
        } else {
            res.status(errors.HTTP_NOT_FOUND).send(errors.MSG_TRANSACTION_NOT_FOUND);
        }
    } catch (err) {
        console.error(err);
        res.status(errors.HTTP_INTERNAL_SERVER_ERROR).send(errors.MSG_INTERNAL_ERROR);
    }
});

module.exports = router;