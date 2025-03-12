const express = require('express');
const router = express.Router();
const errors = require('./errors');
const { pool } = require('./server'); // Import the pool

// --- test the db response
router.get('/testdb', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(errors.HTTP_INTERNAL_SERVER_ERROR).send(errors.MSG_INTERNAL_ERROR);
    }
});

router.get('/', (req, res) => {
    res.send('Welcome to CashFlow API!');
});

module.exports = router;