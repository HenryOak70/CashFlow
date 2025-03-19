// --- set the error messages
const messages = {
    MSG_INTERNAL_ERROR: 'Server error',
    MSG_POOL_SUCCESS: 'Database pool initialized successfully.',
    MSG_POOL_ERROR: 'Error initializing database pool.',
    MSG_POOL_CLOSED: 'Connection pool closed.',
    MSG_ROUTES_SETUP_SUCCESS: `Routes successfully created for {count} tables.`,
    MSG_ROUTES_SETUP_ERROR: `Error creating the routes.`,
    MSG_DB_QUERY_ERROR: 'Database query execution failed.',
    MSG_TABLE_NOT_FOUND: 'Table not found',
    MSG_TRANSACTION_NOT_FOUND: 'Transaction not found',
    MSG_ID_NOT_FOUND: 'No record found with the provided ID.',
    MSG_INVALID_ID: 'Invalid transaction ID. Please provide a valid numeric ID.',
    MSG_INVALID_NUMBER: 'Invalid input: Please enter a valid number.',
    MSG_INVALID_REQUEST_BODY:`Request body is missing or empty.`,
    MSG_TEST_SUCCESS: `Test completed successfully.`,
    MSG_TEST_ERROR: `Error running test.`,
    MSG_TEST_TIMEOUT: `Test failed: Operation took too long to complete.`,
    MSG_TEST_CONFIGURATION_ERROR: `Test failed: Missing or invalid configuration settings.`,
    MSG_TEST_SETUP_FAILED: `Test failed: Error during test setup.`,
    MSG_SERVER_RUNNING: 'Server listening at http://localhost:',
    MSG_SHUTDOWN: 'Server shutting down ...',
};

module.exports = messages;