//A newer version of Express 4.16+, body-parser is builded in to Express.
//Now can call express.urlencoded instead.
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');

const app = express()

//set express to load the tempalte engine that we want
app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoute = require('./routes/admin')
const shopRouter = require('./routes/shop')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

//add the prefix route here to filter. only route contain
//this particular slug will render.
app.use('/admin',adminRoute)
app.use(shopRouter)

app.use((req,res,next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found' });
})

app.listen(3000);