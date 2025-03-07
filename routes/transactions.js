const express = require('express');
const router = express.Router();
// --- import the pool from the server.js file
const { pool } = require('../server');
// --- use function to retrieve data
const { fetchData } = require('../utils/dbUtils');

router.get('/', async (req, res) => {
    try {
        const data = await fetchData(pool, 'tblTransactions');
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

module.exports = router;