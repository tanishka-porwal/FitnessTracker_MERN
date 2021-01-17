const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

//create express server
const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); //middleware
app.use(express.json()); //server will send and receive json

const uri = process.env.ATLAS_URI;
console.log(uri);


const connection = mongoose.connection;
connection.once('open', ()=> {
    console.log("MongoDB connection established!");
})
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);


app.listen(port, () => {
    console.log(`Server is listning at port: ${port}`);
});



// const uri = process.env.ATLAS_URI;

// require('mongoose').connect(uri, {useNewUrlParser: true, useCreateIndex: true}).then((e) => { console.log(e); }).catch((f) => {console.log('failed : ', f);});

// connection = mongoose.connection;