const SubCategory = require('../models/subCategoryModel');
const slugify = require('slugify');
const asyncWrapper = require('../middlewares/asyncWrapper');
const httpStatusText = require('../utils/httpStatusText');
const appError = require('../utils/appError');
const filterObj = require('../middlewares/filterObj');


// @desc   Get list of subcategories
// @route  Get/api/subcategories
// @access public

const getAllSubCategories = asyncWrapper(async(req,res,next)=>{

  const query = req.query;
  const limit = query.limit * 1 || 10;
  const page = query.page * 1 || 1;
  const skip = (page - 1) * limit;
  //console.log('req.params.categoryId :', req.params.categoryId);

  const subCategories = await SubCategory.find(req.filterObj).limit(limit).skip(skip);
  //.populate({path:'category', select:'name -_id'});

  res.json({status:httpStatusText.SUCCESS,results:subCategories.length, page, data:{subCategories}});

});

// @desc   Create subCategory
// @route  POST/api/subcategories
// @access private

const createSubCategory = asyncWrapper(async(req,res)=>{

    const {name , category} = req.body;
    const newSubCategory = new SubCategory({
        name,
        slug:slugify(name),
        category
    });

    await newSubCategory.save();

    res
    .status(201)
    .json({
         status: httpStatusText.SUCCESS 
         , data:{SubCategory: newSubCategory }
        });


});

// @desc   Get specific subcategory by id
// @route  Get/api/subcategories/:id
// @access public

const getSubCategory = asyncWrapper(async(req,res,next)=>{
    const subCategoryId = req.params.subCategoryId;
    const subCategory = await SubCategory.findById(subCategoryId);
    // .populate({path:'category', select:'name -_id'});

    if(!subCategory){
        const error = appError.create(`No subcategory for this id ${subCategoryId}`, 404, httpStatusText.FAIL);
        return next(error);
    }
    
    return res.json({ status: httpStatusText.SUCCESS, data: { subCategory } });


});

// @desc     update specific subcategory
// @route    Get/api/subcategories/:id
// @access   private

const updateSubCategory = asyncWrapper(async(req,res,next)=>{
    const subCategoryId = req.params.subCategoryId;
    const name = req.body.name;
    const category = req.body.category;

    const subCategory = await SubCategory.findOneAndUpdate(
        {_id: subCategoryId},
        { name, slug: slugify(name), category },
        {new: true}
    );
    
    if(!subCategory){
        const error = appError.create(`No subcategory for this id ${subCategoryId}`, 404, httpStatusText.FAIL);
        return next(error);
    }
    
    return res.json({ status: httpStatusText.SUCCESS, data: { subCategory } });


});

// @desc     delete specific subcategory
// @route    DELETE/api/subcategories/:id
// @access   private

const deleteSubCategory = asyncWrapper(async(req, res,next)=>{
    const subCategoryId = req.params.subCategoryId;
    const subCategory = await SubCategory.findByIdAndDelete(subCategoryId);
    
    if(!subCategory){
        const error = appError.create(`No subcategory for this id ${subCategoryId}`, 404, httpStatusText.FAIL);
        return next(error);
    }

    res.status(200).json({ status: httpStatusText.SUCCESS, data: null });

});





module.exports = {
    getAllSubCategories,
    createSubCategory,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory
};
