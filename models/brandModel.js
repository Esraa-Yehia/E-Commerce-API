const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema(
   {
       name:{
        type: String,
        required: [true ,'Brand required'],
        unique: [true , 'Brand must be unique'],
        minlength : [3 ,'Too short brand name'],
        maxlength : [32 ,'Too long brand name']
     },
      // A and B => shoping.com/a-and-b
      slug:{
        type: String,
        lowercase: true,
      },
      image: String,

    },
    {timestamps: true}

);

module.exports = mongoose.model('Brand',brandSchema);

