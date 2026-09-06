const {check} = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

const getCategoryValidator = [ check('categoryId').isMongoId().withMessage('Invalid category ID format'),
    validatorMiddleware,

];

const createCategoryValidator = [ 
    check('name').notEmpty().withMessage('Category name is required')
    .isLength({ min: 3 }).withMessage('Category name must be at least 3 characters long')
    .isLength({ max: 32 }).withMessage('Category name must be at most 32 characters long'),
    validatorMiddleware,
];

const updateCategoryValidator = [
    check('categoryId').isMongoId().withMessage('Invalid category ID format'),
    validatorMiddleware,
];

const deleteCategoryValidator = [
    check('categoryId').isMongoId().withMessage('Invalid category ID format'),
    validatorMiddleware,
];

module.exports = {
    getCategoryValidator,
    createCategoryValidator,
    updateCategoryValidator,
    deleteCategoryValidator,
};
