//A newer version of Express 4.16+, body-parser is builded in to Express.
//Now can call express.urlencoded instead.
const express = require('express')
const path = require('path')

const app = express()

const adminData = require('./routes/admin')
const shopRouter = require('./routes/shop')

app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

//add the prefix route here to filter. only route contain
//this particular slug will render.
app.use('/admin',adminData.routes)
app.use(shopRouter)

app.use((req,res,next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

app.listen(3000);