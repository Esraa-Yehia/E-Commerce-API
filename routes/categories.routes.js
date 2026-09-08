const express = require('express');

const router = express.Router();

const {
    createCategoryValidator ,
    getCategoryValidator ,
    updateCategoryValidator ,
    deleteCategoryValidator
    } = require('../utils/validator/categoryValidator');

const categoryController = require('../controllers/categoryControllers');

const subCategoryRoutes = require('./subCategory.routes');

router.use('/:categoryId/subcategories', subCategoryRoutes);

router.route('/')
    .post(createCategoryValidator, categoryController.createCategory)
    .get(categoryController.getAllCategories);


router.route('/:categoryId')
    .get( getCategoryValidator, categoryController.getCategory )
    .put(updateCategoryValidator, categoryController.updateCategory)
    .delete(deleteCategoryValidator, categoryController.deleteCategory);





module.exports = router;