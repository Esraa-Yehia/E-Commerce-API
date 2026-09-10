const {check} = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const Category = require('../../models/categoryModel');
const SubCategory = require('../../models/subCategoryModel');

const createProductValidator = [
  check('title')
    .notEmpty()
    .withMessage('Product title is required')
    .isLength({ min: 3 })
    .withMessage('Product title must be at least 3      characters long'),

  check('description')
    .notEmpty()
    .withMessage('Product description is required')
    .isLength({ min: 20 })
    .withMessage('Product description must be at least 20 characters long'),

  check('quantity')
    .notEmpty()
    .withMessage('Product quantity is required')
    .isNumeric()
    .withMessage('Product quantity must be a number'),

  check('sold')
    .optional()
    .isNumeric()
    .withMessage('Product sold must be a number'),

  check('price')
    .notEmpty()
    .withMessage('Product price is required')
    .isNumeric()
    .withMessage('Product price must be a number'),

  check('priceAfterDiscount')
    .optional()
    .isNumeric()
    .withMessage('Product price after discount must be a number')
    .toFloat()
    .custom((value, { req }) => {
      if (value >= req.body.price) {
        throw new Error('Product price after discount must be lower than product price');
      }
        return true;
    }),

    check('colors')
    .optional()
    .isArray()
    .withMessage('Product colors must be an array of strings'),

    check('imageCover')
    .notEmpty()
    .withMessage('Product image cover is required'),

    check('images')
    .optional()
    .isArray()
    .withMessage('Product images must be an array of strings'),

    check('category')
    .notEmpty()
    .withMessage('Product category is required')
    .isMongoId()
    .withMessage('Invalid category ID')
    .custom(categoryId =>
      Category.findById(categoryId).then(category => {
        if (!category) {
          return Promise.reject('No category for this id, please enter a valid category id');
        }
      })
    ),

    check('subcategories')
    .optional()
    .isArray()
    .withMessage('Product subcategories must be an array of IDs')
    .custom((subcategoriesIds) =>
      SubCategory.find({ _id: { $exists: true, $in: subcategoriesIds } }).then((result) => {
        if (result.length < 1 || result.length !== subcategoriesIds.length) {
          return Promise.reject(new Error('Invalid subcategory IDs'));
        }
      })
    )
    .custom((value, { req }) =>
      SubCategory.find({ category: req.body.category }).then((subcategories) => {
        const subCategoriesIdsInDB = [];
        subcategories.forEach((subCategory) => {
          subCategoriesIdsInDB.push(subCategory._id.toString());
        });
        const checker = value.every((v) => subCategoriesIdsInDB.includes(v));
        if (!checker) {
          return Promise.reject(new Error('Subcategories not belong to category'));
        }
      })
    ),
    check('brand')
    .optional()
    .isMongoId()
    .withMessage('Invalid brand ID'),

    check('ratingsAverage')
    .optional()
    .isNumeric()
    .withMessage('Product ratings average must be a number')
    .isFloat({ min: 1, max: 5 })
    .withMessage('Product ratings average must be between 1 and 5'),

    check('ratingsQuantity')
    .optional()
    .isNumeric()
    .withMessage('Product ratings quantity must be a number'),


    validatorMiddleware,

];

const getProductValidator = [
  check('productId')
    .isMongoId()
    .withMessage('Invalid product ID'),
    validatorMiddleware,
];

const updateProductValidator = [
  check('productId')
    .isMongoId()
    .withMessage('Invalid product ID'),
    validatorMiddleware,
];

const deleteProductValidator = [
  check('productId')
    .isMongoId()
    .withMessage('Invalid product ID'),
    validatorMiddleware,
];

module.exports = {
    createProductValidator,
    getProductValidator,
    updateProductValidator,
    deleteProductValidator,
};
