const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV)
const app = express();


const user = require('./routes/user')
const books = require('./routes/books')



mongoose.connect(config.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});



// MIDDLEWARE

app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/users', user);
app.use('/api/books', books);

const port = process.env.PORT || 3001

app.listen(port, () =>{
    console.log('SERVER RUNNING')
})