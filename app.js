//A newer version of Express 4.16+, body-parser is builded in to Express.
//Now can call express.urlencoded instead.
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(express.urlencoded({extended: true}))

app.use('/add-product', (req,res,next) =>{
    res.send('<form action="/product" method="POST"><input type="text" name="title"/><button>Add</button></form>')
})

app.use('/product', (req,res,next) =>{
    console.log(req.body)
    res.redirect('/')
})
 
app.use('/', (req,res,next) =>{
    res.send('<h1>HELLOOOOO</h1>')
})

app.listen(3000);