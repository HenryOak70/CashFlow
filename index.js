const { app, pool } = require('./server');
// --- imnport the transactions
const transactionsRoutes = require('./routes/transactions');
// --- import the test routes
const testRoutes = require('./testRoutes');

// --- mount the routes
app.use('/trasactions', transactionsRoutes);
app.use('/test', testRoutes);
