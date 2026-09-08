const express = require('express');

const router = express.Router();

const {
    createProductValidator ,
    getProductValidator ,
    updateProductValidator ,
    deleteProductValidator
    } = require('../utils/validator/productValidator');


const productController = require('../controllers/productControllers');



router.route('/')
    .post(createProductValidator, productController.createProduct)
    .get(productController.getAllProducts);


router.route('/:productId')
    .get( getProductValidator, productController.getProduct )
    .put(updateProductValidator, productController.updateProduct)
    .delete(deleteProductValidator, productController.deleteProduct);





module.exports = router;