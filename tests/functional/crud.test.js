// ##### Tests #####
// --- are the CRUD methods working correctly?
// #################
// @requiresInput TABLE_NAME

//const pool = require('../../utils/dbUtils');
const { server, pool } = require('../../server');
const readline = require('readline');
const { formatTableName } = require('./utils');
const errors = require('../../errors')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

describe('Database CRUD test', () => {
    let tableName;

    beforeAll(() => {
        let rawTableName = process.env.TABLE_NAME;

        if (!rawTableName) {
            throw new Error('No table name provided. Please run the test through index.js.');
        }

        tableName = formatTableName(rawTableName);
        console.log(`Using table: ${tableName}`);
        });

    test('Check communication with the DB - Prompt for table name and get column names', async () => {
        expect(tableName).toBeDefined();

        const query = `SELECT column_name FROM information_schema.columns WHERE table_name = $1`;

        try {
            const { rows } = await pool.query(query, [tableName]);

            console.log(`Columns in ${tableName}:`, rows.map(row => row.column_name));
        // --- at least one line should exist
            expect(rows.length).toBeGreaterThan(0);
        } catch (err) {
            console.error('Error fetching columns:', err);
            throw new Error(errors.MSG_INTERNAL_ERROR);
        }
    // --- extend the timeout to 30 sec in case of DB slow response
    }, 30000);

    afterAll(async () => {
        rl.close();
        await pool.end();
        server.close();
    });
});