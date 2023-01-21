//A newer version of Express 4.16+, body-parser is builded in to Express.
//Now can call express.urlencoded instead.
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const app = express()
const pageNotFoundController = require('./controller/404')
const mongoConnect = require('./utils/database').mongoConnect
//set express to load the tempalte engine that we want
app.set('view engine', 'ejs')
app.set('views', 'views')

require('dotenv').config({path: path.resolve(__dirname+'/.env')});

const User = require('./models/user')
const adminRoute = require('./routes/admin')
const shopRouter = require('./routes/shop')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use((req,res,next) => {
    User.findById('63cc5f00f180235a13905dd2')
        .then(user => {
            req.user = user
            next()
        })
        .catch(err => {
            console.log(err)
        })
})

//add the prefix route here to filter. only route contain
//this particular slug will render.
app.use('/admin',adminRoute)
app.use(shopRouter)

app.use(pageNotFoundController.pageNotFound)

mongoConnect(() => {
    app.listen(3000)
})