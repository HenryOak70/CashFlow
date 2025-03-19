// --- ensure the table name strats with 'tbl'
const formatTableName = (name) => {
    if (!name.startsWith('tbl')) {
        name = 'tbl' + name;
    }
    return 'tbl' + name.slice(3, 4).toUpperCase() + name.slice(4);
};

module.exports = { formatTableName };