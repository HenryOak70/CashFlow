module.exports = {
  getAll: (table) => `SELECT * FROM "${table}"`,
  getById: (table) => `SELECT * FROM "${table}"
                           WHERE id = $1`,
  delete: (table) => `DELETE FROM "${table}"
                  WHERE id = $1 RETURNING *;`,
  getTables: `SELECT tablename
               FROM pg_catalog.pg_tables
               WHERE schemaname = 'public'`,
  checkTableExists: `SELECT EXISTS (
                            SELECT 1 FROM information_schema.tables
                            WHERE table_schema = 'public'
                            AND table_name = $1)`,
  insert: (table, columns) => `INSERT INTO "${table}" (${columns.join(', ')})
                         VALUES (${columns.map((_, i) => `$${i + 2}`).join(', ')})
                          RETURNING *;`
};