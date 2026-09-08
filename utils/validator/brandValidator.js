const {check} = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

const getBrandValidator = [ check('brandId').isMongoId().withMessage('Invalid brand ID format'),
    validatorMiddleware,

];

const createBrandValidator = [ 
    check('name').notEmpty().withMessage('Brand name is required')
    .isLength({ min: 3 }).withMessage('Brand name must be at least 3 characters long')
    .isLength({ max: 32 }).withMessage('Brand name must be at most 32 characters long'),
    validatorMiddleware,
];

const updateBrandValidator = [
    check('brandId').isMongoId().withMessage('Invalid brand ID format'),
    validatorMiddleware,
];

const deleteBrandValidator = [
    check('brandId').isMongoId().withMessage('Invalid brand ID format'),
    validatorMiddleware,
];

module.exports = {
    getBrandValidator,
    createBrandValidator,
    updateBrandValidator,
    deleteBrandValidator,
};
