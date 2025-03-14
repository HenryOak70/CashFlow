module.exports = {
  getAll: () => `SELECT * FROM $1`,
  getById: () => `SELECT * FROM $1
                           WHERE id = $2`,
  delete: () => `DELETE FROM $1
                  WHERE id = $2 RETURNING *;`,
  getTables: `SELECT tablename
               FROM pg_catalog.pg_tables
               WHERE schemaname = 'public'`,
  checkTableExists: () => `SELECT EXISTS (
                            SELECT 1 FROM information_schema.tables
                            WHERE table_schema = 'public'
                            AND table_name = $1)`,
  insert: (columns) => `INSERT INTO $1 (${columns.join(', ')})
                         VALUES (${columns.map((_, i) => `$${i + 2}`).join(', ')})
                          RETURNIG *;`
};