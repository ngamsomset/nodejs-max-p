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

userSchema.methods.deleteFromCart = function (productId) {
  const updatedCartItem = this.cart.items.filter((product) => {
    return product.productId.toString() !== productId.toString();
  });
  //set the cart items to the updated one and call save() method
  this.cart.items = updatedCartItem;

  return this.save();
};

module.exports = mongoose.model("User", userSchema);

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
