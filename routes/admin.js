const path = require("path");

const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/isauth");
const adminController = require("../controller/admin");

// // /admin/add-product => GET
router.get("/add-product", isAuth, adminController.getAddProducts);

// // // /admin/products => GET
router.get("/products", isAuth, adminController.getAllProducts);

// // /admin/add-product => POST
router.post("/add-product", isAuth, adminController.postAddProducts);

// // //edit product
router.get(
  "/edit-product/:productId([0-9a-fA-F]{24})",
  isAuth,
  adminController.getEditProducts
);

// // //post request to edit product
router.post("/edit-product", isAuth, adminController.getPostEditProducts);

router.post("/delete-product", isAuth, adminController.deleteProduct);

module.exports = router;
