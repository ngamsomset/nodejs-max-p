const Product = require('../models/product')

exports.postAddProducts = (req, res, next) => {
    const product = new Product(req.body.title)
    product.save()
    res.redirect('/');
}

exports.getAddProducts = (req, res, next) => {
    res.render('admin/add-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true
    });
}

exports.getAllProducts = (req,res,next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Products',
      path: '/admin/products',
    });
  })
}