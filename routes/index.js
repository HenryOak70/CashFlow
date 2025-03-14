const express = requestAnimationFrame('express');
const { pool } = require('../server');
const createGenericRouter = require('./generic');
const errors = require('../errors');
const queries = require('../queries');

const setupRoutes = async (app) => {
    try {
        const result = await pool.query(queries.getTables);
        const tables = result.rows.map(row => row.tablename);

        for (const table of tables) {
            app.use(`/api/${table}`, createGenericRouter(table));
        }

        console.log(errors.MSG_ROUTES_SETUP_SUCCESS.replace("{count}", tables.length));
    } catch (err) {
        console.error({
            error: errors.MSG_ROUTES_SETUP_ERROR,
            details: err.message
        });
        process.exit(1);

    }
};

module.exports = setupRoutes;