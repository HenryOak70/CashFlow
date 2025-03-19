const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const errors = require('./errors');
const setupRoutes = require('./routes');

require('dotenv').config();

const app = express();
const port = Number(process.env.PORT) || 3000;
const DEFAULT_DB_PORT = 5432;

app.use(cors());
app.use(express.json());

let pool;
try {
    pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: Number(process.env.DB_PORT) || DEFAULT_DB_PORT,
    });
    console.log(errors.MSG_POOL_SUCCESS);
} catch (err) {
    console.error(errors.MSG_POOL_ERROR, err);
    process.exit(1);
}

setupRoutes(app, pool);

const shutdown = async () => {
    console.log(errors.MSG_SHUTDOWN);
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

const server = app.listen(port, () => {
    console.log(`${errors.MSG_SERVER_RUNNING} ${port}`);
});

module.exports = { app, pool, server };