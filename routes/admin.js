const path = require('path');

const express = require('express');
const router = express.Router();

const productsController = require('../controller/products')


// /admin/add-product => GET
router.get('/add-product', productsController.getAddProducts);

// /admin/add-product => POST
router.post('/add-product', productsController.postAddProducts);

module.exports = router
