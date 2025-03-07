const { app, pool } = require('./server');

// --- import the transactions
const transactionsRoutes = require('./routes/transactions');
// --- import the test routes
const testRoutes = require('./testRoutes');

// --- mount the routes
app.use('/transactions', transactionsRoutes);
app.use('/test', testRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Server Error');
});