const express = require('express');
const router = express.Router();
const { pool } = require('../server');
const { fetchData } = require('../utils/dbUtils');
const queries = require('../queries');
const errors = require('../errors');

router.get('/', async (req, res) => {
    try {
        const data = await fetchData(pool, 'tblTransactions', queries.getAll);
    // --- send the data if exists
        res.json(data);
    } catch (err) {
    // --- send error
        console.error(err);
        const statusCode = err.message.includes(errors.MSG_TABLE_NOT_FOUND) ? errors.HTTP_STATUS.NOT_FOUND : errors.HTTP_STATUS.INTERNAL_SERVER_ERROR;
        res.status(statusCode).send(err.message || errors.MSG_INTERNAL_ERROR);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const transactionId = parseInt(req.params.id, 10);
        if (isNaN(transactionId)) {
                return res.status(errors.HTTP_STATUS.BAD_REQUEST).send(errors.MSG_INVALID_ID);
            }

        const data = await fetchData(pool, 'tblTransactions', queries.qryById, [transactionId]);

        if (data && data.length > 0) {
        // --- send data if exists
            res.json(data[0]);
        } else {
        // --- send error
    res.status(errors.HTTP_STATUS.NOT_FOUND).send(errors.MSG_TRANSACTION_NOT_FOUND);
        }
    } catch (err) {
    // --- send error
        console.error(err);
        res.status(errors.HTTP_STATUS.INTERNAL_SERVER_ERROR).send(errors.MSG_INTERNAL_ERROR);
    }
});

module.exports = router;