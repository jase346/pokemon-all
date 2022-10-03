const mysql = require('mysql');
const {promisify} = require('util')
const { database } = require('./config');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {

    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    if (connection) connection.release();
    console.log('Database connection established');
    return;
});

//promisify pool query
promisify(pool.query);

module.exports = pool;