//A newer version of Express 4.16+, body-parser is builded in to Express.
//Now can call express.urlencoded instead.
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const pageNotFoundController = require("./controller/404");

const mongoose = require("mongoose");
const User = require("./models/user");
const session = require("express-session");
const MongoDBStore = require("connect-mongo");
const flash = require("connect-flash");
//set express to load the tempalte engine that we want
app.set("view engine", "ejs");
app.set("views", "views");

require("dotenv").config({ path: path.resolve(__dirname + "/.env") });

// const User = require("./models/user");
const adminRoute = require("./routes/admin");
const shopRouter = require("./routes/shop");
const authRoute = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: MongoDBStore.create({
      mongoUrl: process.env.MONGODB_URI
    })
  })
);

app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use(express.static(path.join(__dirname, "public")));
app.use("/admin", adminRoute);
app.use(shopRouter);
app.use(authRoute);

app.use(pageNotFoundController.pageNotFound);

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    app.listen(3000);
    console.log("connect!");
  })
  .catch((err) => console.error(err));
