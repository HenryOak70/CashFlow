const { app, pool } = require('./server');
const setupRoutes = require('./routes');
const testRoutes = require('./testRoutes');
const errors = require('./errors');

// --- setup dynamic routes
(async () => {
    try {
        await setupRoutes(app);
        console.log(errors.MSG_ROUTES_SETUP_SUCCESS);
    } catch (err) {
        console.error(errors.MSG_ROUTES_SETUP_ERROR, err);
        process.exit(1);
    }
})();

app.use('/test', testRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(errors.HTTP_STATUS.INTERNAL_SERVER_ERROR).send(errors.MSG_INTERNAL_ERROR);
});