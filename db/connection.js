const mysql = require('mysql2');

// const db = mysql.createConnection({
//   host: 'localhost',
//   // Your MySQL username,
//   user: 'root',
//   // Your MySQL password
//   password: 'honeytwix1801',
//   database: 'neuro'
// });

// host: "us-cdbr-east-06.cleardb.net",
// user: "b1fb543e385434",
// password: "77801be9",
// database: "heroku_1550511dffaec6e"

const db = mysql.createConnection({ 
host: "us-cdbr-east-06.cleardb.net",
user: "b1fb543e385434",
password: "77801be9",
database: "heroku_1550511dffaec6e"
});

// const db = mysql.createPool({
//     host: "us-cdbr-east-06.cleardb.net",
//     user: "b1fb543e385434",
//     password: "77801be9",
//     database: "heroku_1550511dffaec6e",
//     connectionLimit: 2,
//     waitForConnections: true,
//     queueLimit: 0,
//     keepAliveInitialDelay: 1000,
//     enableKeepAlive: true,
// })

module.exports = db;
