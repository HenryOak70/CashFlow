const request = require('supertest');
const readline = require('readline');
const queries = require('../../queries');

// Start the server explicitly
const { app, pool } = require('../../server');

console.log('Checking pool before tests:', pool);

if (!pool) {
    throw new Error('Database pool is not initialized!');
}

// --- ensure the right format for table names
const formatTableName = (name) => {
    if (!name.startsWith('tbl')) {
        name = 'tbl' + name;
    }
    return 'tbl' + name.slice(3, 4).toUpperCase() + name.slice(4);
};

// --- prompt for table name
const getTableName = async () => {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('Enter table name (default: tblExpenses): ', async (input) => {
            let tableName = input.trim() ? formatTableName(input.trim()) : 'tblExpenses';
            try {
                const result = await pool.query(queries.checkTableExists);
                const existingTables = result.rows.map(row => row.tablename);

                console.log('Tables in DB:', existingTables);

                if (!existingTables.includes(tableName.toLowerCase())) {
                    console.warn(`Warning: Table "${tableName}" not found. Defaulting to 'tblExpenses'.`);
                    tableName = 'tblExpenses';
                }
            } catch (err) {
                console.error("Error checking table existence:", err);
                tableName = 'tblExpenses';
            }

            rl.close();
            resolve(tableName);
        });
    });
};

// --- get the table name before test starts
let testTable;

beforeAll(async () => {
    jest.setTimeout(10000);
    testTable = await getTableName();
});

describe('CashFlow API Endpoints', () => {
    it('should return 200 for the route endpoint', async () => {
        const res = await request(app).get('/');
        expect(res.status).toBe(200);
    });

    it(`should fetch all records from ${testTable}`, async () => {
        const res = await request(app).get(`/api/${testTable}`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should return 404 for a non-existing endpoint', async () => {
        const res = await request(app).get('/api/nonExistingEndpoint');
        expect(res.status).toBe(404);
    });

    it('should fetch a single record by ID if it exists', async () => {
        const testId = 1;
        const res = await request(app).get(`/api/${testTable}/${testId}`);
        if (res.status === 200) {
            expect(res.body).toHaveProperty('id', testId);
        } else {
            expect(res.status).toBe(404);
        }
    });

    afterAll(async () => {
        await pool.end();
        if (server) {
            server.close();
        }
    });
});
