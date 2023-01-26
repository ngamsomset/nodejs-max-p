//A newer version of Express 4.16+, body-parser is builded in to Express.
//Now can call express.urlencoded instead.
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const pageNotFoundController = require("./controller/404");

const mongoose = require("mongoose");
const User = require("./models/user");

//set express to load the tempalte engine that we want
app.set("view engine", "ejs");
app.set("views", "views");

require("dotenv").config({ path: path.resolve(__dirname + "/.env") });

// const User = require("./models/user");
const adminRoute = require("./routes/admin");
const shopRouter = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("63d306805dc5ec273252b170")
    .then((user) => {
      //important! We need to construct a new User because we want to use
      //all of our User method.
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

//add the prefix route here to filter. only route contain
//this particular slug will render.
app.use("/admin", adminRoute);
app.use(shopRouter);

app.use(pageNotFoundController.pageNotFound);

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DB_CONNECT)
  .then((result) => {
    //check if user already exist, if not create one.
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Brian",
          email: "briantest@test.com",
          cart: {
            items: []
          }
        });
        user.save();
      }
    });

    app.listen(3000);
    console.log("connect!");
  })
  .catch((err) => console.error(err));
