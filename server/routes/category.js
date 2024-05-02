const express = require('express')
const router = express.Router();
const {Category, validateCategory} = require('../models/category')

router.delete('/api/categories/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        const category = await Category.findById(id);
        if(!category){
            return res.status(400).send('There is no such category');
        }
        else{
            await category.deleteOne();
            return res.status(200).json(category);
        }
    }
    catch(err){
        console.log(err);
    }
})

router.put('/api/categories/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        const category = await Category.findById(id);
        if(!category){
            return res.status(400).send('There is no such category');
        }
        else{
            const {error} = validateCategory(req.body);
            if(error){
                return res.status(400).send(error.details[0].message);
            }
             category.name = req.body.name;
             await category.save();
             return res.status(200).json(category);
        }
    }
    catch(err){
        console.log(err);
    }
})

router.get('/api/categories/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        const category = Category.findById(id);
        if(!category){
            return res.status(400).send('There is no such category');
        }
        else{
            return res.status(200).json(category);
        }
    }
    catch(err){
        console.log(err);
    }
})

router.post('/api/categories', async(req,res)=>{
    try{
        const {error} = validateCategory(req.body);
        if(error){
            return res.status(400).send(error.details[0].message);
        }
        else{
            const category = await new Category({
                name : req.body.name
            })

            await category.save();
            return res.status(200).json(category);
        }
    }
    catch(err){
        console.log(err);
    }
})

router.get('/api/categories', async(req,res)=>{
    try{
        const categories = await Category.find();
        if(!categories){
            return res.status(400).send('There are no categories');
        }
        else{
            return res.status(200).json(categories);
        }
    }
    catch(err){
        console.log(err);
    }
})

module.exports = router;