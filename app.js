const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRouter = require('./api/user');
const bodyParser = require('body-parser');

mongoose.connect('mongodb+srv://AB:archanab@ab.eoxpi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('error', errror =>{
    console.log('Connection Failed...');
})

mongoose.connection.on('connected', connect => {
    console.log('Connect to DB...');
})

app.use(bodyParser.json());
app.use('/users', userRouter);


module.exports = app;