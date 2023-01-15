const fs = require('fs')
const path = require('path')
const pathDir = require('../utils/path')

const p = path.join(pathDir, 'data', 'cart.json')


module.exports = class Cart {
    static addProduct(id, productPrice) {
        //Fetching a Cart from a file
        fs.readFile(p, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0}

            if (!err) {
                cart = JSON.parse(fileContent)
            }
            //Analyzing  the cart => find existing product

            //Get the index of the product Id that we pass in 
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id)
            const existingProduct = cart.products[existingProductIndex]

            let updatedProduct
            //check if there is already an existingProduct, if yes we need to replace product and increase QTY.
            if (existingProduct) {
            //-set the updatedProduct = to existingProduct
                updatedProduct = {...existingProduct}
            //-updateProduct Quantity
                updatedProduct.qty = updatedProduct.qty + 1
                cart.products = [...cart.products]
                cart.products[existingProductIndex] = updatedProduct
            } else {
            //if there is no existing product, we want to set the update product to the new productId
            //copy the existing product in cart and pass the new updatedProduct
                updatedProduct = {id: id, qty: 1}
                cart.products = [...cart.products, updatedProduct]
            }
            
            cart.totalPrice = cart.totalPrice + +productPrice

            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err)
            })
        })
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            if(err){
                return
            }
            const updatedCart = {...JSON.parse(fileContent)}
            const product = updatedCart.products.find(prod => prod.id === id)
            const productQty = product.qty
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id)
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty

            fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
                console.log(err)
            })
        })
    }

    static getCart(cb) {
        fs.readFile(p, (err, fileContent) => {
            const cart = JSON.parse(fileContent)
            if(err) {
                return cb(null)
            } else {
                cb(cart)
            }
        })
    }
}