const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'abc123',
        database: 'company'
    },
);

module.exports = db;