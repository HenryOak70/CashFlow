// ##### Tests #####
// --- How are the routes being created?
/// --- Is there an error?
// #################

const express = require('express');
const { pool } = require('../../server');
const setupRoutes = require('../../routes');
const queries = require('../../queries');

// --- check if the module is working correctly
console.log('Checking setupRoutes import:', setupRoutes);

const testSetupRoutes = async () => {
    const app = express();

    try {
        if (typeof setupRoutes !== 'function') {
            throw new Error ('setupRoutes is not a function! Check routes.index.js export.');
        }

        console.log('Running test: Checking route setup... ');
        console.log('Fetching table names... ');

        const result = await pool.query(queries.getTables);

        console.log('Query result:', result);

        if (!result.rows || result.rows.length === 0) {
            console.warn('Warning: No tables found.');
            return;
        }

        const tables = result.rows.map(row => row.tablename);
        console.log('Tables found:', tables);

        // --- check if routes/generic.js exports a function
        for (const table of tables) {
            console.log(`Setting up route: /api/${table}`);
            app.use(`/api/${table}`, require('../routes/generic')(table));
        }

        console.log('All routes created successfully!');
    } catch (err) {
        console.error('Test failed: Error setting up routes.');
        console.error('Details:', err);
    } finally {
        await pool.end();
    }
};

testSetupRoutes();