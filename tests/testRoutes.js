const express = require('express');
const router = express.Router();
const errors = require('../errors');
const { pool } = require('../server'); // Import the pool

// --- test the db response
const TEST_DB_QUERY = 'SELECT NOW()';

router.get('/testdb', async (req, res) => {
    try {
        const result = await pool.query(TEST_DB_QUERY);
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Database connection test failed:', err);
        res.status(errors.HTTP_STATUS.INTERNAL_SERVER_ERROR).send(errors.MSG_INTERNAL_ERROR);
    }
});

router.get('/', (req, res) => {
    res.send('Welcome to CashFlow API!');
});

module.exports = router;