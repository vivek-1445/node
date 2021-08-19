const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/node");
mongoose.set('useFindAndModify', false);

const db = mongoose.connection;

db.on('error', console.error.bind(console, "error in connecting db"));

db.once('open', function(){
    console.log("mongo connected successfully");
});