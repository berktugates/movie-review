const mongoose = require('mongoose')
const Joi = require('joi');

const PersonSchema = mongoose.Schema({
    name : String,
    date_of_birthday: Date,
    nationality: String,
    role : String
})

function validatePerson(person){
    const schema = Joi.object({
        name : Joi.string().min(1).max(100).required(),
        date_of_birthday : Joi.date().required(),
        nationality : Joi.string().min(1).max(100).required(),
        role : Joi.string().min(1).max(20).required()
    })
    return schema.validate(person);
}

const Person = mongoose.model("Person",PersonSchema);
module.exports = {Person, validatePerson}
