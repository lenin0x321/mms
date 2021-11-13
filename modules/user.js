const mongoose = require('mongoose');
const {Schema} = mongoose;

const Userschema = new Schema({
    name:{
        type:String,
        trim:true,
        required: true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    password:{
        type:String,
        min:6,
        max:64,
        required:true
    }
},{timestamps:true});

const User = mongoose.model('User', Userschema);
module.exports = User;