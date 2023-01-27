const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },
        quantity: { type: Number, required: true }
      }
    ]
  }
});

userSchema.methods.addToCart = function (product) {
  const cartProductIndex = this.cart.items.findIndex((cp) => {
    return cp.productId.toString() === product._id.toString();
  });

  let newQuantity = 1;
  const updatedCartItem = [...this.cart.items];

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItem[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItem.push({
      productId: product._id,
      quantity: newQuantity
    });
  }

  const updatedCart = {
    items: updatedCartItem
  };

  this.cart = updatedCart;
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
// const mongodb = require('mongodb')
// const getDb = require('../utils/database').getDb

// class User {
//     constructor(username, email, cart, id){
//         this.name = username
//         this.email = email
//         this.cart = cart // {items: []}
//         this._id = id
//     }

//     save(){
//         const db = getDb()
//         return db.collection('users').insertOne(this)
//                 .catch(err => {console.log(err)})
//     }

//     //only the person who got an item in the cart.
//     //getCart() will have to return a fully populated cart.(because we store only a productId in the cart)
//     //Steps
//     //- Reach to the DB to find the matching productId in the Cart and the product _id which is in the products.
//     // Because we don't have a full embeded reference between each collections so we need to merge them manually
//     getCart(){
//         const db = getDb()

//         const productIds = []
//         const quantities = {}

//         //CART
//         //loop through the cart items and get the productId and quantity
//         this.cart.items.forEach(element => {
//             let prodId = element.productId
//             productIds.push(prodId)
//             quantities[prodId] = element.quantity
//         });

//         //PRODUCTS
//         return db
//                 .collection('products')
//                 .find({ _id: { $in: productIds} })
//                 .toArray()
//                 .then((products) => {
//                     return products.map((p) => {
//                         return {...p, quantity: quantities[p._id]}
//                     })
//                 })

//     }

//     deleteFromCart(productId) {
//         const updatedCartItem = this.cart.items.filter((product) => {
//             return product.productId.toString() !== productId.toString()
//         })

//         const db = getDb()
//         return db.collection('users')
//                 .updateOne({ _id: mongodb.ObjectId(this._id) }, { $set: {cart: {items: updatedCartItem}} })
//                 .catch(err => console.log(err))
//     }

//     addOrder(){
//         //getting the item that is already in the cart and put into the order then empty the cart.
//         //empty the cart, and remove them from the db.

//         //when adding order, we need to add, user info and product info as well,
//         //because when we getOrder to display those on the page, we will need those info.
//         const db = getDb()
//         return this.getCart().then(products => {
//             const order = {
//                 items: products,
//                 user: {
//                     _id: new mongodb.ObjectId(this._id),
//                     name: this.name,
//                 }
//             }
//             return db.collection('orders').insertOne(order)
//         })
//         .then(result => {
//             this.cart = {items: []}
//             return db.collection('users')
//                 .updateOne({ _id: mongodb.ObjectId(this._id) }, { $set: {cart: {items: []}} })
//                 .catch(err => console.log(err))
//         })
//     }

//     getOrder() {
//         const db = getDb()
//         //mongodb buildin method to compare the property 'user._id'
//         return db.collection('orders').find({'user._id': new mongodb.ObjectId(this._id)}).toArray()
//     }

//     static findById(userId) {
//         const db = getDb()
//         return db.collection('users')
//                 .find({ _id: new mongodb.ObjectId(userId)})
//                 .next()
//                 .then(user => {
//                     return user
//                 })
//                 .catch(err => console.log(err))
//     }
// }

// module.exports = User
