const express = require('express');
const router = express.Router();

const Product = require('../models/products');

router.get('/products', function(req, res){
    Product.find(function(err,products){
        res.json(products);
    });
});

router.post('/product', function(req,res){

    let newProduct = new Product({
        product_name: req.body.product_name,
        product_description: req.body.product_description,
        price: req.body.price,
        quantity: req.body.quantity
    });

    newProduct.save(function(err, contact){
        if(err){
            res.json({msg:'Failed to add product'});
        }else {
             res.json({msg:'Product added successfully'});
        }

    });

});

router.delete('/product/:id', function(req,res){
    Product.remove({_id: req.params.id},function(err,result){
        if(err){
            res.json({msg:'Failed to delete product'});
        }else {
             res.json({msg:result});
        }
    });
});

module.exports = router;