// ##### Tests #####
// --- Are the table names retrieved successfully?
// #################

const { pool } = require('../../server');
const queries = require('../../queries');

const testGetTables = async () => {
    try {
        console.log('Running test: Fetching table names from the database...');

        const result = await pool.query(queries.getTables);

        console.log('Query result: ', result);

        if (!result.rows || result.rows.length === 0) {
            console.error('Test failed: No tables found.');
        } else {
            console.log('Success: Tables retrieved correctly.');
            console.log('Tables: ', result.rows.map(row => row.tablename));
        }
    } catch (err) {
        console.error('Test failed: Error fetching tables.');
        console.error('Details:', err.message);
    } finally {
        await pool.end();
    }
};

testGetTables();