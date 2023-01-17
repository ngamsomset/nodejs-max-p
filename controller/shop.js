const Product = require('../models/product')
const Cart = require('../models/cart')

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then((products) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'all Products',
      path: '/products',
    });
  })
  .catch((err) => {
    console.log(err)
  })
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId
    Product.findById(prodId)
      .then(([product]) => {
        res.render('shop/product-details', {
          product: product[0],
          pageTitle: 'Product Info',
          path: '/products'
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

exports.getIndex = (req,res,next) => {
  Product.findAll()
  .then((products) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
    });
  })
  .catch((err) => {
    console.log(err)
  })
}

exports.getCart = (req,res,next) => {
  //we dont want just the item in the cart but we also want
  //the detail of those product in the cart, so we need to
  //compare item in the cart with the product list(use ID)
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = []
      //need to filter out the product that is in the cart
      for (product of products) {
        const cartProductData = cart.products.find(prod => prod.id == product.id)
        if(cartProductData) {
          //we need to include qty because in the product array there is no qty.
          cartProducts.push({productData: product, qty:cartProductData.qty})
        }
      }
      res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products: cartProducts
      })
    })
  })
}

exports.deleteFromCart = (req,res,next) => {
  const prodId = req.body.productId
  Product.fetchAll(product => {
    Cart.deleteProduct(prodId, product.price)
  })
  res.redirect('/cart')
}

exports.postCart = (req,res,next) => {
  const prodId = req.body.productId
  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price)
  })
  res.redirect('/cart')
}

exports.checkOut = (req,res,next) => {
  res.render('shop/checkout', {
      path: '/checkout',
      pageTitle: 'Check out'
  })
}

exports.getOrders = (req,res,next) => {
  res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Get orders'
  })
}