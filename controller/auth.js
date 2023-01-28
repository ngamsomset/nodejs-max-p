exports.getLogin = (req, res, next) => {
  const isLoggedIn = req.get("Cookie").split("=")[1].trim();
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: isLoggedIn
  });
};

exports.postLogin = (req, res, next) => {
  //this is not working!!. Even we set the req.isLoggedIn = true but right after we send the respond.
  //the req is no longer there because the respond already been throw, thus terminated.
  // req.isLoggedIn = true;
  res.setHeader("Set-Cookie", "loggedIn=true");
  res.redirect("/");
};
