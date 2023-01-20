const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const mongoConnect = (cb) => {
    MongoClient.connect('mongodb+srv://admin:R7S3mfqtSDmcvX4n@cluster0.bqsjw.mongodb.net/?retryWrites=true&w=majority')
    .then(client => {
        console.log('connected!')
        cb(client)
    })
    .catch(err=> console.log(err))
}

module.exports = mongoConnect