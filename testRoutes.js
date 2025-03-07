const express = require('express');
const router = express.Router();
const { pool } = require('./server'); // Import the pool

// --- test the db response
router.get('/testdb', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Database Error');
    }
});

router.get('/', (req, res) => {
    res.send('Welcome to CashFlow API!');
});

module.exports = router;