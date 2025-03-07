const qryAllFromTable = `SELECT * FROM `;
const qryById = `SELECT * FROM ${tableName} WHERE id = $1`;

module.exports = { qryAllFromTable, qryById };