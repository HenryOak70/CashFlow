async function checkTableExists(pool, tableName) {
    try {
        const result = await pool.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables
                WHERE table_schema = 'public'
                AND table_name = '${tableName}'
            )
        `);
        return result.rows[0].exists;
    } catch (err) {
        console.error(err);
        return false;
    }
}

async function fetchData(pool, tableName) {
    try {
        const tableExists = await checkTaleExists(pool, tableName);
        if(tableExists) {
            const result = await pool.query(`SELECT * FROM ${tableName}`);
            return result.rows;
        } else {
            return null;
        }
    } catch (err) {
        console.error(err);
        return null;
    }
}

module.exports = { checkTableExists, fetchData };