const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
// --- load variables form .env file
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// --- enable CORS
app.use(cors());
// --- parse JSON request bodies
app.use(express.json());

let poo;
try {
    pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    // --- use DB_PORT from .env file or default to 5432
    port: process.env.DB_PORT || 5432,
    });
    console.log("Database pool initialized successfully.");
} catch (err) {
    console.error("Error initializing database pool.", err);
    // --- exit if pool initialization fails
    process.exit(1);
}

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

module.exports = { app, pool };