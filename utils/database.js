const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const mongoConnect = (cb) => {
    MongoClient.connect(process.env.DB_CONNECT)
    .then(client => {
        console.log('connected!')
        cb(client)
    })
    .catch((err) => {
        console.log(err)
        throw err
    })
}

module.exports = mongoConnect