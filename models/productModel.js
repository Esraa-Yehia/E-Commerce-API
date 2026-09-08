const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    title:{
        type: String,
        required: [true, 'Please provide product title'],
        trim: true,
        minLength: [3, 'Too short product title'],
        maxLength: [100, 'Too long product title'],
    },
    slug:{
        type: String,
        required: true,
        lowercase: true,
    },
    description:{
        type: String,
        required: [true, 'Please provide product description'],
        minLength: [20, 'Too short product description'],
    },
    quantity:{
        type: Number,
        required: [true, 'Please provide product quantity'],
    },
    sold:{
        type: Number,
        default: 0,
    },
    price:{
        type: Number,
        required: [true, 'Please provide product price'],
        trim: true,
        min: [0, 'Product price cannot be negative'],
    },
    priceAfterDiscount:{
        type: Number,
    },
    colors:{
        type: [String],
    },
    imageCover:{
        type: String,
        required: [true, 'Please provide product image cover'],
    },
    images:{
        type: [String]
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Please provide product category'],
    },
    subcategories:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
    }],
    brand:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
    },
    ratingsAverage:{
        type: Number,
        min: [1, 'Rating must be above or equal 1.0'],
        max: [5, 'Rating must be below or equal 5.0'],
    },
    ratingsQuantity:{
        type: Number,
        default: 0,
    },


},{ timestamps: true });


module.exports = mongoose.model('Product', productSchema);