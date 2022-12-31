//A newer version of Express 4.16+, body-parser is builded in to Express.
//Now can call express.urlencoded instead.
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const adminRouter = require('./routes/admin')
const shopRouter = require('./routes/shop')

app.use(express.urlencoded({extended: true}))

//add the prefix route here to filter. only route contain
//this particular slug will render.
app.use('/admin',adminRouter)
app.use(shopRouter)

app.use((req,res,next) => {
    res.status(404).send('<h1>Page not found!</h1>')
})

app.listen(3000);