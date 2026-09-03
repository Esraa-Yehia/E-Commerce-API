const express = require('express');

const router = express.Router();

const categoryController = require('../controllers/categoryControllers');

router.route('/')
    .post(categoryController.createCategory)
    .get(categoryController.getAllCategories);


router.route('/:categoryId')
    .get(categoryController.getCategory)
    .put(categoryController.updateCategory)
    .delete(categoryController.deleteCategory);





module.exports = router;