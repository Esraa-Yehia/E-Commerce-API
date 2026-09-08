const Brand = require('../models/brandModel');
const slugify = require('slugify');
const asyncWrapper = require('../middlewares/asyncWrapper');
const httpStatusText = require('../utils/httpStatusText');
const appError = require('../utils/appError');

// @desc   Get list of brands
// @route  Get/api/brands
// @access public

const getAllBrands = asyncWrapper(async(req,res,next)=>{

  const query = req.query;
  const limit = query.limit * 1 || 10;
  const page = query.page * 1 || 1;
  const skip = (page - 1) * limit;

  const brands = await Brand.find({}).limit(limit).skip(skip);

  res.json({status:httpStatusText.SUCCESS,results:brands.length, page, data:{brands}});

});

// @desc   Create brand
// @route  POST/api/brands
// @access private

const createBrand = asyncWrapper(async(req,res)=>{
    const name = req.body.name;
    const newBrand = new Brand({
        name,
        slug:slugify(name),
    });

    await newBrand.save();

    res
    .status(201)
    .json({
         status: httpStatusText.SUCCESS 
         , data:{Brand: newBrand }
        });


});

// @desc   Get specific brand by id
// @route  Get/api/brands/:id
// @access public

const getBrand = asyncWrapper(async(req,res,next)=>{
    const brandId = req.params.brandId;
    const brand = await Brand.findById(brandId);

    if(!brand){
        const error = appError.create(`No brand for this id ${brandId}`, 404, httpStatusText.FAIL);
        return next(error);
    }

    return res.json({ status: httpStatusText.SUCCESS, data: { brand } });


});

// @desc     update specific brand
// @route    Get/api/brands/:id
// @access   private

const updateBrand = asyncWrapper(async(req,res,next)=>{
    const brandId = req.params.brandId;
    const name = req.body.name;

    const brand = await Brand.findOneAndUpdate(
        {_id: brandId},
        { name, slug: slugify(name) },
        {new: true}
    );
    
    if(!brand){
        const error = appError.create(`No brand for this id ${brandId}`, 404, httpStatusText.FAIL);
        return next(error);
    }
    
    return res.json({ status: httpStatusText.SUCCESS, data: { brand } });


});

// @desc     delete specific brand
// @route    DELETE/api/brands/:id
// @access   private

const deleteBrand = asyncWrapper(async(req, res,next)=>{
    const brandId = req.params.brandId;
    const brand = await Brand.findByIdAndDelete(brandId);
    
    if(!brand){
        const error = appError.create(`No brand for this id ${brandId}`, 404, httpStatusText.FAIL);
        return next(error);
    }

    res.status(200).json({ status: httpStatusText.SUCCESS, data: null });

});


module.exports={
    getAllBrands,
    createBrand,
    getBrand,
    updateBrand,
    deleteBrand
};
