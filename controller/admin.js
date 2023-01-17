const Product = require('../models/product')

exports.postAddProducts = (req, res, next) => {
    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const price = req.body.price
    const description = req.body.description
   
    Product.create({
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description
    })
    .then((result) => {
      // console.log(result)
      console.log('product created!')
      res.redirect('/admin/products')
    })
    .catch((err) => {
      console.log(err)
    })
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

  const prodId = req.params.productId
  Product.findByPk(prodId)
  .then((product) => {
    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  })
  .catch((err) => {
    console.log(err)
  })
}

exports.getPostEditProducts = async (req,res,next) => {
  const prodId =  req.body.productId
  const updatedTitle = req.body.title
  const updatedPrice = req.body.price
  const updatedImageUrl = req.body.imageUrl
  const updatedDesc = req.body.description

try {
  await Product.update({ title: updatedTitle, price: updatedPrice, imageUrl: updatedImageUrl, description: updatedDesc }, {
    where: {
      id: prodId
    }
  })
  res.redirect('/admin/products')
} catch(err) {
  console.log(err)
}

}

exports.getAllProducts = (req,res,next) => {
  Product.findAll()
  .then((products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Products',
      path: '/admin/products',
    });
  })
  .catch((err) => {
    console.log(err)
  })
}

exports.deleteProduct = (req,res,next) => {
  const prodId =  req.body.productId
  Product.destroy({
    where: {
      id: prodId
    }
  })
  .catch((err) => {
    console.log(err)
  })
  res.redirect('/admin/products')
}