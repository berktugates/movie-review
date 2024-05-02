const express = require('express');
const router = express.Router();
const {Movie,validateMovie} = require('../models/movie');

router.delete('/api/movies/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        const movie = await Movie.findById(id);

        if(!movie){
            return res.status(400).send('There is no such movie');
        }
        else{
            await movie.deleteOne();
            return res.status(200).json(movie); //belki üst satıra geçebilir postman incele
        }
    }
    catch(err){
        console.log(err)
    }
})

router.put('/api/movies/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        const movie = await Movie.findById(id);
        if(!movie){
            res.status(400).send("There is no such movie")
        }
        else{
            const {error} = validateMovie(req.body);
            if(error){
                res.status(400).send(error.details[0].message);
            }
            movie.title = req.body.title
            movie.description = req.body.description
            movie.is_home = req.body.is_home
            movie.is_active = req.body.is_active
            movie.image = req.body.image
            movie.rayting = req.body.rayting
            movie.category_id = req.body.category_id
            movie.director_id = req.body.director_id
            movie.actors_id = req.body.actors_id

            await movie.save();
            return res.status(200).json(movie)
        }
    }
    catch(err){
        console.log(err);
    }
})

router.get('/api/movies/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        const movie = await Movie.findById(id);
        if(!movie){
            return res.status(400).send('There is no such movie')
        }
        else{
            return res.status(200).json(movie);
        }
    }
    catch(err){
        console.log(err);
    }
})

router.post('/api/movies', async(req,res)=>{
    try{
        const {error} = validateMovie(req.body);
        if(error){
            return res.status(400).send(error.details[0].message)
        }
        const movie =  await new Movie({
            title : req.body.title,
            description : req.body.description,
            is_home : req.body.is_home,
            is_active : req.body.is_active,
            image : req.body.image,
            rayting : req.body.rayting,
            category_id : req.body.category_id,
            director_id : req.body.director_id,
            actors_id : req.body.actors_id
        })
        
        await movie.save();
        return res.status(200).json(movie)
    }
    catch(err){
        console.log(err);
    }
});

router.get('/api/movies',async(req, res)=>{
    try{
        const movies = await Movie.find();
        if(!movies){
            return res.status(400).send('There is no movies')
        }
        else{
            return res.status(200).json(movies);
        }
    }
    catch(err){
        console.log(err)
    }
})
module.exports = router;