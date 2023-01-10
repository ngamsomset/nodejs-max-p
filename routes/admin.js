const path = require('path');

const express = require('express');
const router = express.Router();

const adminController = require('../controller/admin')


// /admin/add-product => GET
router.get('/add-product', adminController.getAddProducts);

// /admin/products => GET
router.get('/products', adminController.getAllProducts);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProducts);

module.exports = router
