const mysql = require('mysql2');

// const db = mysql.createConnection({
//   host: 'localhost',
//   // Your MySQL username,
//   user: 'root',
//   // Your MySQL password
//   password: 'honeytwix1801',
//   database: 'neuro'
// });

const db = mysql.createConnection({ 
HOST: "us-cdbr-east-06.cleardb.net",
USER: "b1fb543e385434",
PASSWORD: "77801be9",
DB: "heroku_1550511dffaec6e"
});

module.exports = db;
