const express = require('express');
const router = express.Router();
// --- import the data pool from the server.js file
const { pool } = require('../server');
// --- import functions from dbUtils.js file
const { fetchData } = require('../utils/dbUtils');
// --- import queries from queries folder
const queries = require('../queries');

router.get('/', async (req, res) => {
    try {
        const data = await fetchData(pool, 'tblTransactions', queries.qryAllFromTable);
    // --- send the data if exists
        res.json(data);
    } catch (err) {
        if (err.message.includes('not found')) {
        // --- send message for table not found
            res.status(404).send(err.message);
        } else {
        // --- send message for other errors
            res.status(500).send('Server Error');
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
            res.status(404).send('Transaction not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;