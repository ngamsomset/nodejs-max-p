const Product = require('../models/product')

exports.postAddProducts = (req, res, next) => {
    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const price = req.body.price
    const description = req.body.description
    const product = new Product(title, price, description, imageUrl)
    product.save()
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
  Product.findById(prodId)
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

  const product = new Product(updatedTitle, updatedPrice, updatedDesc, updatedImageUrl, prodId)
  product.update()
    .then(result => {
      console.log('UPDATED PRODUCT!')
      res.redirect('/admin/products')
    })
    .catch(err => console.log(err))


}

exports.getAllProducts = (req,res,next) => {
  Product.fetchAll()
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

// exports.deleteProduct = (req,res,next) => {
//   const prodId =  req.body.productId
//   Product.destroy({
//     where: {
//       id: prodId
//     }
//   })
//   .catch((err) => {
//     console.log(err)
//   })
//   res.redirect('/admin/products')
// }