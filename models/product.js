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
    constructor(t){
        this.title = t
    }

    save() {
        //this will save the data into a json file in /data directory
        getProductsFromFile(products => {
            products.push(this)
            fs.writeFile(p, JSON.stringify(products), (err) => {
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
}