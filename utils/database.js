const Sequelize = require('sequelize')
const sequelize = new Sequelize('nodejs_max', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
})


module.exports = sequelize