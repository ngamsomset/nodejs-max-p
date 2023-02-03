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

exports.postSignup = (req, res, next) => {};

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
