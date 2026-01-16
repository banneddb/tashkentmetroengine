/* eslint-disable no-undef */

import mysql from 'mysql2/promise';
import "dotenv/config";

// Creates a pool for the server to manage multiple SQL requests at the same time.
const pool = mysql.createPool({ 
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DB,
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
