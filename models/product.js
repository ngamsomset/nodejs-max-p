const Cart = require('./cart')
const db = require('../utils/database')
module.exports = class Product {
    constructor(id,title, imageUrl, price, description){
        this.id = id
        this.title = title
        this.imageUrl = imageUrl
        this.price = price
        this.description = description
    }

    save() {

    }

    static delete(id) {
     
    }

    static fetchAll(){
        return db.execute('select * from products')
        // .then((data) => {
        //     console.log(data)
        // })
        // .catch((err) => {
        //     console.log(err)
        // })
    }

    static findById(id) {

    }

}