const express = require("express");

const authController = require("../controller/auth");

const router = express.Router();

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.post("/logout", authController.postLogout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
router.get("/reset", authController.getReset);
router.post("/reset", authController.postReset);
router.get("/new-password", authController.getNewpassword);
router.post("/new-password", authController.postNewpassword);

module.exports = router;
