const bcrypt = require("bcrypt");

const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    errorMessage: message,
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    errorMessage: message,
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const saltRounds = 10;

  User.findOne({ email: email }).then((userDoc) => {
    if (userDoc) {
      req.flash("error", "Email already exist!!");
      return res.redirect("/");
    }

    return bcrypt
      .hash(password, saltRounds)
      .then(function (hash) {
        const user = new User({
          email: email,
          password: hash,
          cart: { items: [] }
        });
        return user.save();
      })
      .then((result) => {
        res.redirect("/login");
      })
      .catch((err) => console.error(err));
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash("error", "No email found");
        return res.redirect("/login");
      }

      if (bcrypt.compareSync(password, user.password)) {
        req.session.isLoggedIn = true;
        req.session.user = user;
        return req.session.save((err) => {
          console.error(err);
          res.redirect("/");
        });
      }
      res.redirect("/login");
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
