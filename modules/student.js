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
    },
    role:{
        type: [String],
        default: ["Student"],
        enum: ["Student", "Teacher", "Admin"],
    }
},{timestamps:true});

const Student = mongoose.model('Student', Userschema);
module.exports = Student;