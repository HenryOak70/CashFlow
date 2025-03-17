// ##### Tests #####
// --- Is the query working correctly?
// #################

const { pool } = require('../../server');
const queries = require('../../queries');

const queryToTest = { text: queries.getTables };

const testQuery = async () => {
    try {
        console.log('Running test: Validating the query...');
        console.log('Executing query:', queryToTest);

        const result = await pool.query(queryToTest);

        console.log('Query test result:', result);

        if (!result.rows) {
            console.error('Test failed: result is undefined.');
        } else if (result.rows.length === 0) {
            console.warn('Warning: The query returned no results.');
        } else {
            console.log('Success: Query executed successfully.');
            console.log('Result:', result.rows);
        }
    } catch (err) {
        console.error('Test failed: Error executing query.');
        console.error('Details:', err);
    } finally {
        await pool.end();
    }
};

console.log('Checking pool:', pool);
testQuery();