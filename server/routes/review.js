const express = require("express");
const router = express.Router();
const {Review, validateReview} = require("../models/review")

router.delete("/api/reviews/:id", async(req,res)=>{
    try{
        const id = req.params.id;
        const review = await Review.findById(id);
        if(!review){
            return res.status(400).send("There is no such review");
        }
        await review.deleteOne();
        return res.status(200).json(review);
    }
    catch(err){
        console.log(err);
    }
})

router.put("/api/reviews/:id", async(req,res)=>{
    try{
        const id = req.params.id;
        const review = await Review.findById(id);
        if(!review){
            return res.status(400).send("There is no such review")
        }
        const { error } = validateReview(req.body);
        if(error){
            return res.status(400).send(error.details[0].message);
        }
        review.name = req.body.name;
        review.comment = req.body.comment;
    }
    catch(err){
        console.log(err);
    }
})

router.get("/api/reviews/:id", async(req,res)=>{
    try{
        const id = req.params.id;
        const review = await Review.findById(id);
        if(!review){
            return res.status(400).send("There is no such review");
        }
        return res.status(200).json(review);
    }
    catch(err){
        console.log(err);
    }
})

router.post("/api/reviews", async(req,res)=>{
    try{
        const { error } = validateReview(req.body);
        if(error){
            return res.status(400).send(error.details[0].message);
        }
        const review = await new Review({
            movie_id : req.body.movie_id,
            name : req.body.name,
            comment : req.body.comment
        })
        await review.save();
        return res.status(200).json(review);
    }
    catch(err){
        console.log(err);
    }
});

router.get("/api/reviews", async(req,res)=>{
    try{
        const reviews = await Review.find();
        if(!reviews){
            return res.status(400).send('There is no reviews')
        }
        return res.status(200).json(reviews);
    }
    catch(err){
        console.log(err)
    }
})

module.exports = router;