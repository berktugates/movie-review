const express = require('express');
const app = express();
const PORT = 8080;
const cors = require('cors');
const mongoose = require('mongoose')

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

const username = 'berktug'
const password = '1903'
const database = 'movie-review'

const movieRoutes = require('./routes/movie');
const categoryRoutes = require('./routes/category');
const personRoutes = require('./routes/person');

app.use(express.json());
app.use(movieRoutes);
app.use(categoryRoutes);
app.use(personRoutes);

const uri = `mongodb+srv://${username}:${password}@movie-review-cluster.n7z23j2.mongodb.net/${database}?retryWrites=true&w=majority&appName=movie-review-cluster`

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