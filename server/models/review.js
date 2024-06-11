const mongoose = require("mongoose");
const joi = require("joi");

const reviewSchema = mongoose.Schema({
    movie_id: String,
    name : String,
    comment : String
})

const Review = mongoose.model("Review", reviewSchema);

function validateReview(review){
    const schema = joi.object({
        movie_id : joi.string().required(),
        name : joi.string().required(),
        comment : joi.string().required()
    });
    return schema.validate(review);
}

module.exports = {Review, validateReview}