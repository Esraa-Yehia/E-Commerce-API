const express = require('express');
const setCategoryIdToBody = require('../middlewares/setCategoryIdToBody');
const filterObj = require('../middlewares/filterObj');
// mergeParams: true allows us to access the params from the parent route (categoryId) in this router(child)
const router = express.Router({ mergeParams: true });
const {
    createsSubCategoryValidator ,
    getsSubCategoryValidator ,
    updateSubCategoryValidator ,
    deleteSubCategoryValidator
    } = require('../utils/validator/subCategoryValidators');


const subCategoryControllers = require('../controllers/subCategoryControllers');


router.route('/')
.get(filterObj, subCategoryControllers.getAllSubCategories)
.post(setCategoryIdToBody, createsSubCategoryValidator, subCategoryControllers.createSubCategory);


router.route('/:subCategoryId')
.get(getsSubCategoryValidator, subCategoryControllers.getSubCategory)
.put(updateSubCategoryValidator, subCategoryControllers.updateSubCategory)
.delete(deleteSubCategoryValidator, subCategoryControllers.deleteSubCategory);

module.exports = router;