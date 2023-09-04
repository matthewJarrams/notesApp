const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
require('dotenv').config();
const Belts = require("./Models/DB");
const noteRoutes = require('./Routes/noteRoutes.js')
const userRoutes = require('./Routes/userRoutes.js')

const app = express()
const port = process.env.PORT || 5000;



app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
console.log("MongoDB database connection established successfully");
})

app.listen(port, () => {
    console.log("Hello welcome to the notes app. Running on port " + port)
});

app.get('/message',(req, res) => {
    res.json({message: "Hello Code Ninjas Marda Loop. This is your server!"})
})


//test route for getting user who is logged in
app.use('/notes',  noteRoutes);
app.use('/', userRoutes);


