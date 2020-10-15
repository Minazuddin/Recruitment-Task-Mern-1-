const express = require('express');
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/uploads', express.static('uploads'));

//connecting to mongoDB
const uri = 'mongodb+srv://minhaj:' + process.env.DB_PASSWORD + '@node-api-shop.5wrjk.mongodb.net/test?retryWrites=true&w=majority';
 mongoose.connect(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true
    }, () => console.log("connected to mongodb atlas..."));


const loginRouter = require('./routes/login')
const signUpRouter = require('./routes/signup')
const postRouter = require('./routes/post')

app.use(cors());

app.use('/login', loginRouter);
app.use('/signup', signUpRouter);
app.use('/post', postRouter);

module.exports = app;