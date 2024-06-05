const express = require('express');
const router = express.Router();
const {Person, validatePerson} = require('../models/person');

router.delete('/api/persons/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        const person = await Person.findById(id);
        if(!person){
            return res.status(400).send('There is no such person');
        }
        else{
            await person.deleteOne();
            return res.status(200).json(person); 
        }
    }
    catch(err){
        console.log(err);
    }
})

router.put('/api/persons/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        const person = await Person.findById(id);
        if(!person){
            return res.status(400).send('There is no such person');
        }
        else{
            const {error} = validatePerson(req.body);
            if(error){
                console.log(error);
            }
            else{
                person.name = req.body.name;
                person.date_of_birthday = req.body.date_of_birthday;
                person.nationality = req.body.nationality;
                person.role = req.body.role;

                await person.save();
                return res.status(200).json(person);
            }
        }
    }
    catch(err){
        console.log(err);
    }
})

router.get('/api/persons/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const person = await Person.findById(id);
        if(!person){
            return res.status(400).send('There is no such person');
        }
        else{
            return res.status(200).json(person);
        }
    }
    catch(err){
        console.log(err);
    }
})

router.post('/api/persons',async(req,res)=>{
    try{
        const {error} = validatePerson(req.body);
        if(error){
            return res.status(400).send(error.details[0].message);
        }
        else{
            const person = await new Person({
                name : req.body.name,
                date_of_birthday : req.body.date_of_birthday,
                nationality : req.body.nationality,
                role : req.body.role
            })
            await person.save();
            return res.status(200).json(person);
        }
    }
    catch(err){
        console.log(err);
    }
})

router.get('/api/persons', async(req,res)=>{
    try{
        const persons = await Person.find();
        if(!persons){
            return res.status(400).send('There are no persons');
        }
        else{
            return res.status(200).json(persons);
        }
    }
    catch(err){
        console.log(err);
    }
})

module.exports = router;
