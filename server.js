const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const errors = require('./errors');
// --- load variables form .env file
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// --- enable CORS
app.use(cors());
// --- parse JSON request bodies
app.use(express.json());

const DEFAULT_DB_PORT = 5432;

let pool;
try {
    pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        // --- use DB_PORT from .env file or default to 5432
        port: process.env.DB_PORT || DEFAULT_DB_PORT,
    });
    console.log(errors.MSG_POOL_SUCCESS);
} catch (err) {
    console.error(errors.MSG_POOL_ERROR, err);
    // --- exit if pool initialization fails
    process.exit(1);
}

// --- gracefull shutdown
const shutdown = async () => {
    console.log(errors.MSG_SHUTDOWN);
    // --- ensure all connections are closed before exiting
    await pool.end(() => {
        console.log(errors.MSG_POOL_CLOSED);
        process.exit(0);
    });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// --- start
app.listen(port, () => {
    console.log(`${errors.MSG_SERVER_RUNNING} ${port}`);
});

module.exports = { app, pool };