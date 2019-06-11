const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: 'localhost', 
     user:'root', 
     password: 'jcm800mason',
     database: 'SDC-Reviews'
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