const express = require('express');
const router = express.Router();

const {
    createsSubCategoryValidator ,
    getsSubCategoryValidator ,
    updateSubCategoryValidator ,
    deleteSubCategoryValidator
    } = require('../utils/validator/subCategoryValidators');


const subCategoryControllers = require('../controllers/subCategoryControllers');


router.route('/')
.get(subCategoryControllers.getAllSubCategories)
.post(createsSubCategoryValidator, subCategoryControllers.createSubCategory);


router.route('/:subCategoryId')
.get(getsSubCategoryValidator, subCategoryControllers.getSubCategory)
.put(updateSubCategoryValidator, subCategoryControllers.updateSubCategory)
.delete(deleteSubCategoryValidator, subCategoryControllers.deleteSubCategory);

module.exports = router;