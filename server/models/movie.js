const mongoose = require('mongoose')
const Joi = require('joi');

const movieSchema = mongoose.Schema({
    title : String,
    description : String,
    is_home : Boolean,
    is_active : Boolean,
    image : String,
    rayting : Number,
    category_id: String,
    director_id: String,
    actors_id: Array
})

const Movie = mongoose.model("Movie",movieSchema);

function validateMovie (movie){
    const schema = Joi.object({
        title : Joi.string().min(1).max(100).required(),
        description : Joi.string().required(),
        is_home : Joi.boolean().required(),
        is_active : Joi.boolean().required(),
        image : Joi.string(),
        rayting : Joi.number().required(),
        category_id : Joi.number().required(),
        director_id : Joi.number().required(),
        actors_id: Joi.array().required()
    })
    return schema.validate(movie)
}

module.exports = {Movie,validateMovie};