const mongoose = require('mongoose');
const env = require('./environments');


mongoose.connect(`mongodb://localhost/${env.db}`);

const db = mongoose.connection;

db.on('err',console.error.bind(console,'Error in Connection of DB'));

db.once('open',function(){
    console.log('Connected to Database');
});

module.exports = db;