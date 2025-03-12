module.exports = {
    getAll: (tableName) => `SELECT * FROM ${tableName}`,
    getById: (tableName) => `SELECT * FROM ${tableName} WHERE id = $1`,
    delete: (tableName) => `DELETE FROM ${tableName} WHERE id = $1 RETURNING *;`,
  };