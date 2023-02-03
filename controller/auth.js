const bcrypt = require("bcrypt");

const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    isAuthenticated: false
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const saltRounds = 10;

  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        return res.redirect("/");
      }

      bcrypt.hash(password, saltRounds, function (err, hash) {
        const user = new User({
          email: email,
          password: hash,
          cart: { items: [] }
        });
        return user.save();
      });
    })
    .then((result) => {
      res.redirect("/login");
    })
    .catch((err) => console.error(err));
};

exports.postLogin = (req, res, next) => {
  User.findById("63d306805dc5ec273252b170")
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      //the reason we need to call save() is because we need to make sure that
      //the session get save FIRST then redirect happen.
      req.session.save((err) => {
        console.error(err);
        res.redirect("/");
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
