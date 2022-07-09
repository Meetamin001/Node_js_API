// importing express library and create app cariable to use it for server
const express = require('express');
const app = express();

//importing env library for URL
require('dotenv').config()
//MIDDLEWARE - ask server to accept JSON
app.use(express.json())

//create mongoose to connect mongodb database
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'))

//setup routes
const usersRouter = require('../routes/users');
app.use('/users',usersRouter)

//listen to port, create server
app.listen(3001, () => {
  console.log('listening on port 3001');
})