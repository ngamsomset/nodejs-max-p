const path = require('path')
const express = require('express')
const router = express.Router()


router.get('/', (req,res,next) =>{
    //__dirname hold the absolute path of the project
    res.sendFile(path.join(__dirname, '../' , 'views', 'shop.html'))
})

module.exports = router