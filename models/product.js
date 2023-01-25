const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Product", productSchema);

// const mongodb = require('mongodb')
// const getDb = require('../utils/database').getDb

// class Product {
//     constructor(title, price, description, imageUrl, id, userId) {
//         this.title = title
//         this.price = price
//         this.description = description
//         this.imageUrl = imageUrl
//         this._id = new mongodb.ObjectId(id)
//         this.userId = userId
//     }

//     save() {
//         const db = getDb()
//         return  db.collection('products').insertOne(this)
//             .catch((err) => {
//                 console.log(err)
//             })
//     }

//     update() {
//         const db = getDb()
//         return db.collection('products').updateOne({ _id: this._id }, { $set: this })
//         .catch(err => {
//             console.log(err)
//         })
//     }

//     static delete(prodId) {
//         const db = getDb()
//         return db.collection('products').deleteOne({ _id: new mongodb.ObjectId(prodId)})
//         .catch(err => {
//             console.log(err)
//         })
//     }

//     static fetchAll() {
//         const db = getDb()
//         return db.collection('products').find().toArray()
//             .then(products => {
//                 console.log(products)
//                 return products
//             })
//             .catch(err => {
//                 console.log(err)
//             })
//     }

//     static findById(prodId) {
//         const db = getDb()

//         return db
//         .collection('products')
//         .find({_id: new mongodb.ObjectId(prodId)})
//         .next()
//         .then(product => {
//             console.log(product)
//             return product
//         })
//         .catch(err => {
//             console.log(err)
//         })
//     }
// }

// module.exports = Product
