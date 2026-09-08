const express = require('express');

const router = express.Router();

const {
    createBrandValidator ,
    getBrandValidator ,
    updateBrandValidator ,
    deleteBrandValidator
    } = require('../utils/validator/brandValidator.js');

const brandControllers = require('../controllers/brandControllers');


router.route('/')
    .post(createBrandValidator, brandControllers.createBrand)
    .get(brandControllers.getAllBrands);


router.route('/:brandId')
    .get( getBrandValidator, brandControllers.getBrand )
    .put(updateBrandValidator, brandControllers.updateBrand)
    .delete(deleteBrandValidator, brandControllers.deleteBrand);





module.exports = router;