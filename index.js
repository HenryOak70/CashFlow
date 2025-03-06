const { app, pool } = require('./server');

// --- test the db response
app.get('/testdb',async (req, res) => {
    try{
        const result = await pool.query('SELECT NOW()');
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Database Error');
    }
});

app.get('/',(req, res) => {
    res.send('Welcome to CashFlow API!');
});
