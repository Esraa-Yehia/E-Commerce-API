const Category = require('../models/categoryModel');
const slugify = require('slugify');

const createCategory = (req,res)=>{
    
    const newCategory = new Category(req.body);
    newCategory.save();

    res
    .status(201)
    .json({ Category: newCategory });


}

module.exports={
    createCategory
};