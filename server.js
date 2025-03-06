const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
// --- load variables form .env file
require('dotenv').config();

const app = express();
const port = process.env.PORT // || 3000;

// --- enable CORS
app.use(cors());
// --- parse JSON request bodies
app.use(express.json());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    user: process.env.DB_NAME,
    user: process.env.DB_PASSWORD,
    // --- use DB_PORT from .env file or default to 5432
    user: process.env.DB_PORT || 5432,
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

module.exports = { app, pool};