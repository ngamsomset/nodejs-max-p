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
        //get the existing product in the cart
        const cartProductIndex = this.cart.items.findIndex(cp => {
            return cp.productId.toString() === product._id.toString()
        })
        //init new qty = 1
        let newQuantity = 1
        const updatedCartItem = [...this.cart.items]

        //check if the product is already in the cart
        //if item exist in the cart, we want to set the quantity of that product + 1
        //else we want to push the new object into the cart.
        if (cartProductIndex >= 0) {
            newQuantity = this.cart.items[cartProductIndex].quantity + 1
            updatedCartItem[cartProductIndex].quantity = newQuantity
        } else {
            updatedCartItem.push({
                productId: new mongodb.ObjectId(product._id),
                quantity: newQuantity
            })
        }
        
        const updatedCart = {items: updatedCartItem}
        const db = getDb()
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