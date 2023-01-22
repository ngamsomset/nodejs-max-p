const mongodb = require('mongodb')
const getDb = require('../utils/database').getDb


class User {
    constructor(username, email, cart, id){
        this.name = username
        this.email = email
        this.cart = cart // {items: []}
        this._id = id
    }

    save(){
        const db = getDb()
        return db.collection('users').insertOne(this)
                .catch(err => {console.log(err)})
    }

    addToCart(product) {
        const db = getDb()
        //store only productId because the rest of the data from product we don't need.
        const updatedCart = {items: [{ productId: mongodb.ObjectId(product._id), quantity: 1 }]}
        return db.collection('users')
                .updateOne({ _id: mongodb.ObjectId(this._id) }, { $set: {cart: updatedCart} })
                .catch(err => console.log(err))
    }

    static findById(userId) {
        const db = getDb()
        return db.collection('users')
                .find({ _id: new mongodb.ObjectId(userId)})
                .next()
                .then(user => {
                    return user
                })
                .catch(err => console.log(err))
    }
}


module.exports = User