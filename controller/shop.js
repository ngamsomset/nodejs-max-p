const Product = require('../models/product')

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
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
    .then((product) => {
      res.render('shop/product-details', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      })
    })
    .catch((err) => {
      console.log(err)
    })

  }

exports.getIndex = (req,res,next) => {
  Product.fetchAll()
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
  req.user
    .getCart()
    .then((cartProducts) => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      })
    })
    .catch((err) => {console.log(err)}) 
    
}

exports.deleteFromCart = (req,res,next) => {
  const prodId = req.body.productId
  req.user
    .deleteFromCart(prodId)
    .then(result => {
      res.redirect('/cart')
    })
    .catch(err => console.log(err))
}

exports.postCart = (req,res,next) => {
  const prodId = req.body.productId
  Product.findById(prodId)
  .then(product => {
    return req.user.addToCart(product)
  })
  .then(result =>  {
    console.log(result)
    res.redirect('/cart')
  })
}

exports.checkOut = (req,res,next) => {
  res.render('shop/checkout', {
      path: '/checkout',
      pageTitle: 'Check out'
  })
}

exports.postOrders = (req, res, next) => {
  req.user
    .addOrder()
    .then(result => {
      res.redirect('/orders')
    })
    .catch(err => console.error(err))
}

exports.getOrders = (req,res,next) => {
  req.user.getOrder()
    .then(order => {
      res.render('shop/orders', {
          path: '/orders',
          pageTitle: 'Get orders',
          orders: order
      })
    })
}