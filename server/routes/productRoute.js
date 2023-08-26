const {Router} = require('express');
const router = Router();
const {createProduct, deleteProduct, getAllProduct, getOneProduct, updateProduct, uploadProductPhoto, resizeTourImages, MyProduct, isMyProduct, FilterProduct} = require('../controllers/productController')
const {protect, restrictTo} = require('../controllers/authController')
const reviewRouter = require('./reviewRoutes')


router.use('/:productId/reviews', reviewRouter);

router.get('/myProduct', protect, restrictTo('shop'), MyProduct)
router.get('/filterProduct', FilterProduct)

router.route('/')
    .get(getAllProduct)
    .post(protect, restrictTo('admin', 'shop'), uploadProductPhoto, resizeTourImages, createProduct)

router.route('/:id')
    .get(getOneProduct)
    .patch(protect, restrictTo('admin', 'shop'), isMyProduct, uploadProductPhoto, resizeTourImages, updateProduct)
    .delete(protect, restrictTo('admin', 'shop'), isMyProduct, deleteProduct)

module.exports = router;
