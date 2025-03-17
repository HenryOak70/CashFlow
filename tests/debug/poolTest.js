// ##### Tests #####
// --- Is the pool working correctly?
// #################

const { pool } = require('../../server');

const testPool = async() =>{
    console.log('Checking database pool... ');

    try {
        console.log('Running test: Connecting to database...');
        const client = await pool.connect();
        console.log('Connection successful!');

        console.log('Pool object:', pool);
        client.release();
    } catch (err) {
        console.error('Test failed: Connection issue.');
        console.error('Detail:', err);
    } finally {
        await pool.end();
    }
};

testPool();