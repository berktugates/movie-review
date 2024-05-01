const express = require('express');
const app = express();
const PORT = 8080;
const cors = require('cors');
const mongoose = require('mongoose')

const username = 'berktugsosyal'
const password = 1234
const database = 'movie-review'

const uri = `mongodb+srv://${username}:${password}@cluster0.uimsvjf.mongodb.net/${database}?retryWrites=true&w=majority&appName=Cluster0`

async function connect(){
    try{
        await mongoose.connect(uri)
        console.log("Connected to MongoDB")
    }
    catch(err){
        console.log(err);
    }
}

connect();

app.use(cors());

app.get('/api/home',(req,res)=>{
    res.json({'message' : 'hello world'});
})

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})