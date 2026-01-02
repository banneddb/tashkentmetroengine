/* eslint-disable no-undef */

import mysql from 'mysql2/promise';

// Creates a pool for the server to manage multiple SQL requests at the same time.
const pool = mysql.createPool({ 
    host: 'localhost',
    user: 'behruzomon',
    password: 'behruz2005',
    database: 'storedDB',
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0
})

pool.getConnection((err, connection) => {
    if (err) {
        console.log("Could not connect to database");
        throw err;
    }
    console.log("Successfully connected to the database pool");
    connection.release();
});

export default pool;
