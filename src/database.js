const mysql = require('mysql');
const { database } = require('./config');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') console.log('Database connection was closed');
    if (err.code === 'ER_CON_COUNT_ERROR') console.log('Database has to many connections');
    if (err.code === 'ECONNREFUSED') console.log('Database connection was refused');

    if (connection) connection.release();
    console.log('Database connection established');
    return;
});

export default pool;