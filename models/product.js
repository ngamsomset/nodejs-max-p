const fs = require('fs')
const path = require('path')
const pathDir = require('../utils/path')



//This const need to be outside of the helper function
//because the save() won't have access to it. Thus
//result in p is not define.
const p = path.join(pathDir, 'data', 'products.json')
//helper function. Because we reuse this logic many places
//it's good to have a function to handle that.
//1. This function will red the file at fetchAll method
//2. At save() also need to fetch the existing data
//   before wrting a new one into it.
const getProductsFromFile = cb => {
    //read file from JSON
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([])
        } else {
            // fileContent need to parse back from JSON to JS object
            cb(JSON.parse(fileContent))
        }
    })
}

module.exports = class Product {
    constructor(id,title, imageUrl, price, description){
        this.id = id
        this.title = title
        this.imageUrl = imageUrl
        this.price = price
        this.description = description
    }
    //we use the same save() method for editing the product by
    //checking the existing ID, if it does exist means that we
    //are editing a product not creating a new one
    save() {
        //this will save the data into a json file in /data directory
        getProductsFromFile(products => {
            //if product Id exsiting means we will edit it not create new one
            if(this.id) {
                const existingProductIndex = products.findIndex(prod => prod.id === this.id)
                const updatedProducts = [...products]
                updatedProducts[existingProductIndex] = this
                fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                    console.log(err)
                })
            } else {
                this.id = Math.random().toString()
                products.push(this)
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err)
                })                
            }
        })
    }

    static delete(id) {
        getProductsFromFile(products => {
                //use filter to filter out the delete one and return an array without that delete item
                const updatedProduct = products.filter(prod => prod.id !== id)
                fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
                    console.log(err)
                })
        })
    }

    //the reason that we need to pass cb into this fetchAll
    //is that this is async operation, in the fronend at shop.ejs
    //we call products.length too early while there is no data
    //coming in yet.
    static fetchAll(cb){
      getProductsFromFile(cb)
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id)
            cb(product)
        })
    }

}