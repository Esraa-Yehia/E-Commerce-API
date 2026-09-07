const {check} = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

const getsSubCategoryValidator = [ check('subCategoryId').isMongoId().withMessage('Invalid subcategory ID format'),
    validatorMiddleware,

];

const createsSubCategoryValidator = [ 
    check('name').notEmpty().withMessage('SubCategory name is required')
    .isLength({ min: 2 }).withMessage('SubCategory name must be at least 2 characters long')
    .isLength({ max: 32 }).withMessage('SubCategory name must be at most 32 characters long'),
    check('category').notEmpty().withMessage('SubCategory must belong to a valid category').isMongoId().withMessage('Invalid category ID format'),
    validatorMiddleware,
];

const updateSubCategoryValidator = [
    check('subCategoryId').isMongoId().withMessage('Invalid subcategory ID format'),
    validatorMiddleware,
];

const deleteSubCategoryValidator = [
    check('subCategoryId').isMongoId().withMessage('Invalid subcategory ID format'),
    validatorMiddleware,
];

module.exports = {
    getsSubCategoryValidator,
    createsSubCategoryValidator,
    updateSubCategoryValidator,
    deleteSubCategoryValidator,
};


