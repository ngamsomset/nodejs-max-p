const mysql = require('mysql2')

const pool = mysql.createPool({
    host:'localhost',
    user: 'root',
    password: 'password',
    database: 'nodejs_max'
})

module.exports = pool.promise()