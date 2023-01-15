const Product = require('../models/product')

exports.postAddProducts = (req, res, next) => {
    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const price = req.body.price
    const description = req.body.description
    //the first argument need to be null as we use the same method for save and edit
    //by passing null, we want to make sure that the logic in the model save() get
    //pass to the save() not at edit. 
    const product = new Product(null, title, imageUrl, price, description)
    product.save()
    res.redirect('/');
}

exports.getAddProducts = (req, res, next) => {
    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing: false
    });
}

exports.getEditProducts = (req, res, next) => {
  //check for query params
  const editMode = req.query.edit
  if (!editMode) {
    return res.redirect('/')
  }
  //Get the product Id from the URL that we pass :productId to
  //We want to get the data of that product and populate it 
  //in the input field for user to edit
  const prodId = req.params.productId
  Product.findById(prodId, product => {
    if(!product) {
      return res.redirect('/')
    }
    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  })
}

exports.getPostEditProducts = (req,res,next) => {
  const prodId =  req.body.productId
  const updatedTitle = req.body.title
  const updatedPrice = req.body.price
  const updatedImageUrl = req.body.imageUrl
  const updatedDesc = req.body.description
  const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedPrice, updatedDesc)
  updatedProduct.save()
  res.redirect('/admin/products')
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

exports.deleteProduct = (req,res,next) => {
  const prodId =  req.body.productId
  Product.delete(prodId)
  res.redirect('/admin/products')
}