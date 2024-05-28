require('dotenv').config({path: __dirname + '/.env'});
const mysql = require('mysql2/promise');

// const connection = mysql.createPool(process.env.URL_DB_MySql);
// URL_DB_MySql="mysql://root:root@localhost:3306/dbo"

// root
// posGraduacao2024
const connection = mysql.createPool({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE_DB,
    multipleStatements: true
})


module.exports = connection;