const mongoose = require('mongoose')
const Joi = require('joi');

const CategorySchema = mongoose.Schema({
    name : String
})

function validateCategory(category){
    const schema = Joi.object({
        name : Joi.string().min(1).max(100).required()
    })

    return schema.validate(category);
}

const Category = mongoose.model("Category",CategorySchema);
module.exports = {Category, validateCategory}

