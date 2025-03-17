const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const errors = require('./errors');
const setupRoutes = require('./routes')

// --- load variables form .env file
require('dotenv').config();

const app = express();
const port = Number(process.env.PORT) || 3000;
const DEFAULT_DB_PORT = 5432;

// --- enable CORS
app.use(cors());
// --- parse JSON request bodies
app.use(express.json());

// --- initialize PostgreSQL pool
let pool;
try {
    pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        // --- ensure DB_PORT from .env file is a number
        // --- use DB_PORT or default to 5432
        port: Number(process.env.DB_PORT) || DEFAULT_DB_PORT,
    });
    console.log(errors.MSG_POOL_SUCCESS);
} catch (err) {
    console.error(errors.MSG_POOL_ERROR, err);
    // --- exit if pool initialization fails
    process.exit(1);
}

// --- setup all routes from routes/index.js
setupRoutes(app, pool);

// --- graceful shutdown
const shutdown = async () => {
    console.log(errors.MSG_SHUTDOWN);
    // --- ensure all connections are closed before exiting
    try {
        await pool.end();
        console.log(errors.MSG_POOL_CLOSED);
    } catch (err) {
        console.error(errors.MSG_POOL_ERROR, err);
    } finally {
        process.exit(0);
    }
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// --- start server (but skip in tests)
let server = null;
if (process.env.NODE_ENV !== 'test'){
    server = app.listen(port, () => {
        console.log(`${errors.MSG_SERVER_RUNNING} ${port}`);
    });
} else {
    server = { close: async () => {} };
}

module.exports = { app, pool, server };