const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    product_name:{
        type:String,
        required: true
    },
    product_description:{
        type:String,
         required: true
    },
    price:{
        type:Number,
         required: true
    },
    quantity:{
        type:Number,
         required: true
    }
});

const Product = module.exports = mongoose.model('Product',ProductSchema );