const express = require('express');
const createGenericRouter = require('./generic');
const errors = require('../errors');
const queries = require('../queries');

const setupRoutes = async (app, pool) => {
    try {
    // ###DEBUG LOG ### check if pool is defined
        console.log("Checking pool in setupRoutes:", pool);
    // ###DEBUG LOG ### check if query runs
        console.log("Fetching table names ...");
        const result = await pool.query(queries.getTables);
        console.log("Query result:", result);

    // --- ensure the result is an array and has data
        if(!result.rows || result.rows === 0) {
            console.error(errors.MSG_DB_QUERY_ERROR);
            process.exit(1);
        }
    // ###DEBUG LOG ### check if the tables were found
        console.log('Tables found:', result.rows.map(row=> row.tablename));

        const tables = result.rows.map(row => row.tablename);

        for (const table of tables) {
    // ###DEBUG LOG ### check if the rout is created
            console.log(`Setting up route: /api/${table}`);
            app.use(`/api/${table}`, createGenericRouter(table, pool));
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