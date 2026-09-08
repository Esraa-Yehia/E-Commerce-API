const Product = require('../models/productModel');
const slugify = require('slugify');
const asyncWrapper = require('../middlewares/asyncWrapper');
const httpStatusText = require('../utils/httpStatusText');
const appError = require('../utils/appError');

// @desc   Get list of products
// @route  Get/api/products
// @access public

const getAllProducts = asyncWrapper(async(req,res,next)=>{

  const query = req.query;
  const limit = query.limit * 1 || 10;
  const page = query.page * 1 || 1;
  const skip = (page - 1) * limit;

  const products = await Product.find({}).limit(limit).skip(skip).populate({
        path: 'category',
        select: 'name-_id'
    });;

  res.json({status:httpStatusText.SUCCESS,results:products.length, page, data:{products}});

});

// @desc   Create product
// @route  POST/api/products
// @access private

const createProduct = asyncWrapper(async(req,res)=>{
    
    req.body.slug = slugify(req.body.title);
    
    const newProduct = new Product(req.body);

    await newProduct.save();

    res
    .status(201)
    .json({
         status: httpStatusText.SUCCESS 
         , data:{Product: newProduct }
        });


});

// @desc   Get specific product by id
// @route  Get/api/products/:id
// @access public

const getProduct = asyncWrapper(async(req,res,next)=>{
    const productId = req.params.productId;
    const product = await Product.findById(productId).populate({
        path: 'category',
        select: 'name-_id'
    });

    if(!product){
        const error = appError.create(`No product for this id ${productId}`, 404, httpStatusText.FAIL);
        return next(error);
    }

    return res.json({ status: httpStatusText.SUCCESS, data: { product } });


});

// @desc     update specific product
// @route    Get/api/products/:id
// @access   private

const updateProduct = asyncWrapper(async(req,res,next)=>{
    const productId = req.params.productId;
    if(req.body.title){
        req.body.slug = slugify(req.body.title);
    }

    const product = await Product.findOneAndUpdate(
        {_id: productId},
        req.body ,
        {new: true}
    );
    
    if(!product){
        const error = appError.create(`No product for this id ${productId}`, 404, httpStatusText.FAIL);
        return next(error);
    }
    
    return res.json({ status: httpStatusText.SUCCESS, data: { product } });


});

// @desc     delete specific product
// @route    DELETE/api/products/:id
// @access   private

const deleteProduct = asyncWrapper(async(req, res,next)=>{
    const productId = req.params.productId;
    const product = await Product.findByIdAndDelete(productId);
    
    if(!product){
        const error = appError.create(`No product for this id ${productId}`, 404, httpStatusText.FAIL);
        return next(error);
    }

    res.status(200).json({ status: httpStatusText.SUCCESS, data: null });

});


module.exports={
    getAllProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct
};
   