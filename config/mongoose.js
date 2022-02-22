const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeial_development');

const db = mongoose.connection;

db.on('err',console.error.bind(console,'Error in Connection of DB'));

db.once('open',function(){
    console.log('Connected to Database');
});

module.exports = db;