const fs = require('fs')
const path = require('path')
const pathDir = require('../utils/path')

module.exports = class Product {
    constructor(t){
        this.title = t
    }

    save() {
        //this will save the data into a json file in /data directory
        const p = path.join(pathDir, 'data', 'products.json')
        fs.readFile(p, (err, fileContent) => {
            let products = []
            if (!err) {
                products = JSON.parse(fileContent)
            }
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
        const p = path.join(pathDir, 'data', 'products.json')
        //read file from JSON
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                cb([])
            }
            // fileContent need to parse back from JSON to JS object
            return cb(JSON.parse(fileContent))
        })
    }
}