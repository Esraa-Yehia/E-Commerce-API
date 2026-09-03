const Category = require('../models/categoryModel');
const slugify = require('slugify');
const asyncWrapper = require('../middlewares/asyncWrapper');
const httpStatusText = require('../utils/httpStatusText');
const appError = require('../utils/appError');

// @desc   Get list of categories
// @route  Get/api/categories
// @access public

const getAllCategories = asyncWrapper(async(req,res,next)=>{

  const query = req.query;
  const limit = query.limit * 1 || 10;
  const page = query.page * 1 || 1;
  const skip = (page - 1) * limit;

  const categories = await Category.find({}).limit(limit).skip(skip);

  res.json({status:httpStatusText.SUCCESS,results:categories.length, page, data:{categories}});

});

// @desc   Create category
// @route  POST/api/categories
// @access private

const createCategory = asyncWrapper(async(req,res)=>{
    const name = req.body.name;
    const newCategory = new Category({
        name,
        slug:slugify(name),
    });

    await newCategory.save();

    res
    .status(201)
    .json({
         status: httpStatusText.SUCCESS 
         , data:{Category: newCategory }
        });


});

// @desc   Get specific category by id
// @route  Get/api/categories/:id
// @access public

const getCategory = asyncWrapper(async(req,res,next)=>{
    const categoryId = req.params.categoryId;
    const category = await Category.findById(categoryId);

    if(!category){
        const error = appError.create(`No category for this id ${categoryId}`, 404, httpStatusText.FAIL);
        return next(error);
    }
    
    return res.json({ status: httpStatusText.SUCCESS, data: { category } });


});

// @desc     update specific category
// @route    Get/api/categories/:id
// @access   private

const updateCategory = asyncWrapper(async(req,res,next)=>{
    const categoryId = req.params.categoryId;
    const name = req.body.name;

    const category = await Category.findOneAndUpdate(
        {_id: categoryId},
        { name, slug: slugify(name) },
        {new: true}
    );
    
    if(!category){
        const error = appError.create(`No category for this id ${categoryId}`, 404, httpStatusText.FAIL);
        return next(error);
    }
    
    return res.json({ status: httpStatusText.SUCCESS, data: { category } });


});

// @desc     delete specific category
// @route    DELETE/api/categories/:id
// @access   private

const deleteCategory = asyncWrapper(async(req, res,next)=>{
    const categoryId = req.params.categoryId;
    const category = await Category.findByIdAndDelete(categoryId);
    
    if(!category){
        const error = appError.create(`No category for this id ${categoryId}`, 404, httpStatusText.FAIL);
        return next(error);
    }

    res.status(200).json({ status: httpStatusText.SUCCESS, data: null });

});


module.exports={
    getAllCategories,
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
};