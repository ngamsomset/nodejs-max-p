const Sequalize = require('sequalize')
const sequalize = new Sequalize('nodejs_max', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
})


module.exports = sequalize