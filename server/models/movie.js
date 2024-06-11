const mongoose = require('mongoose')
const Joi = require('joi');

const movieSchema = mongoose.Schema({
    title : String,
    description : String,
    is_home : Boolean,
    is_active : Boolean,
    image : String,
    rating : Number,
    category_name: String,
    release_year: Number,
    duration: Number,
    director_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person',
    },
    actors_name: Array,
})

const Movie = mongoose.model("Movie",movieSchema);

function validateMovie (movie){
    const schema = Joi.object({
        title : Joi.string().min(1).max(100).required(),
        description : Joi.string().required(),
        is_home : Joi.boolean().required(),
        is_active : Joi.boolean().required(),
        image : Joi.string(),
        rating : Joi.number().required(),
        category_name : Joi.string().required(),
        release_year: Joi.number().min(1880).required(),
        duration: Joi.number().required(),
        director_id : Joi.string().required(),
        actors_name: Joi.array().required(),
    })
    return schema.validate(movie)
}

module.exports = {Movie,validateMovie};