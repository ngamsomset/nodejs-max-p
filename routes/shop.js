const path = require('path');
const express = require('express');
const router = express.Router();
const shopController = require('../controller/shop')

router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);
//this REGEX is to make sure that the ID is a valid ObjectId for mongodb to use.
router.get('/products/:productId([0-9a-fA-F]{24})', shopController.getProduct);
router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postCart);
router.get('/orders', shopController.getOrders);
router.post('/create-order', shopController.postOrders);
router.post('/cart-delete-item', shopController.deleteFromCart);


module.exports = router;
