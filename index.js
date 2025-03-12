const { app, pool } = require('./server');

// --- import the transactions
const transactionsRoutes = require('./routes/transactions');
// --- import the test routes
const testRoutes = require('./testRoutes');
// --- import error handling from errors folder
const errors = require('./errors');

// --- mount the routes
app.use('/transactions', transactionsRoutes);
app.use('/test', testRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(errors.HTTP_STATUS.INTERNAL_SERVER_ERROR).send(errors.MSG_INTERNAL_ERROR);
});