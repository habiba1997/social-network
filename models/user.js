const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
name: {
    type: String,
    required: true
},
email: {
    type: String,
    required: true,
    unique: true
},
password: {
    type: String,
    required: true
},
avatar: {
    type: String,
},
date: {
    type: Date,
    default: Date.now
},
});

//  I am exporting a mongoose model created from userschema by name user model and I name it User(exported)
module.exports =  User = mongoose.model('user', userschema);