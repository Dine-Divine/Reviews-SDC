const mariadb = require('mariadb');
require('dotenv').config();
const pool = mariadb.createPool({
     host: process.env.DB_HOST, 
     user: process.env.DB_USER, 
     password: process.env.DB_PASSWORD,
     database: process.env.DB_DATABASE,
     port: process.env.DB_PORT
});

// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/Reviews');

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log('were connected!')
// });

// const schema = mongoose.Schema({
//      avatar: String,
//      ' name': String,
//      ' review': String,
//      ' date': String,
//      ' rating': Number,
//      ' uuid': Number
// });

// const Reviews = mongoose.model('Review', schema)

module.exports = {pool};