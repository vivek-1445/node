const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    name:{
        type : String,
        require:true
    },
    mail:{
        type : String,
        require:true
    },
    password:{
        type : String,
        require:true
    },
    phone:{
        type : Number,
        require:true
    }
});

const Contact = mongoose.model('Contact',contactSchema);

module.exports = Contact;