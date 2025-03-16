const express = require('express');
const errors = require('../errors');
const queries = require('../queries/generic');
const { fetchData, insertData, updateData, deleteData } = require('../utils/dbUtils');

const createGenericRouter = (table, pool) => {
    const router = express.Router();

    router.get('/', async (req, res) => {
        try {
            const data = await fetchData(pool, table, queries.getAll(table));
            res.json(data);
        } catch (err) {
            console.error(errors.MSG_DB_QUERY_ERROR, err);

            res.status(errors.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                error: errors.MSG_DB_QUERY_ERROR,
            // --- include error details for debuging
                details: err.message,
            });
        }
    });

    router.get('/:id', async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                return res.status(errors.HTTP_STATUS.BAD_REQUEST).json({
                    error: errors.MSG_INVALID_ID,
                });
            }
            const data = await fetchData(pool, table, queries.getById(table), [id]);
            if (data.length > 0) {
                res.json(data[0]);
            } else {
                res.status(errors.HTTP_STATUS.NOT_FOUND).json({
                    error: errors.MSG_ID_NOT_FOUND,
                });
            }
        } catch (err) {
            console.error(errors.MSG_DB_QUERY_ERROR, err);
            res.status(errors.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                error: errors.MSG_DB_QUERY_ERROR,
                details: err.message,
            });
        }
    });

    router.post('/', async (req, res) => {
        try {
            const newData = req.body;
            if (!newData || Object.keys(newData).length === 0) {
                return res.status(errors.HTTP_STATUS.BAD_REQUEST).json({
                    error: errors.MSG_INVALID_REQUEST_BODY,
                });
            }
            const data = await insertData(pool, table, newData);
            res.status(errors.HTTP_STATUS.CREATED).json(data);
        } catch (err) {
            console.error(errors.MSG_DB_QUERY_ERROR, err)
            res.status(errors.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                error: errors.MSG_DB_QUERY_ERROR,
                details: err.message,
            });
        }
    });

    router.put('/:id', async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            if(isNaN(id)) {
                return res.status(errors.HTTP_STATUS.BAD_REQUEST).json({
                    error: errors.MSG_INVALID_ID,
                });
            }
            const updatedData = req.body;
            if (!updatedData || Object.keys(updatedData).length === 0) {
                return res.status(errors.HTTP_STATUS.BAD_REQUEST).json({
                    error: errors.MSG_INVALID_REQUEST_BODY,
                });
            }
            const data = await updateData(pool, table, updatedData, id);
            res.json(data);
        } catch (err) {
            console.error(errors.MSG_DB_QUERY_ERROR, err);
            res.status(errors.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                error: errors.MSG_DB_QUERY_ERROR,
                details: err.message,
            });
        }
    });

    router.delete('/:id', async(req, res) => {
        try {
            const id =parseInt(req.params.id, 10);
            if (isNaN(id)) {
                return res.status(errors.HTTP_STATUS.BAD_REQUEST).json({
                    error: errors.MSG_INVALID_ID,
                });
            }
            const data = await deleteData(pool, table, id);
            res.json(data);
        } catch (err) {
            console.error(errors.MSG_DB_QUERY_ERROR, err);
            res.status(errors.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                error: errors.MSG_DB_QUERY_ERROR,
                details: err.message,
            });
        }
    });

    return router;

};

module.exports = createGenericRouter;