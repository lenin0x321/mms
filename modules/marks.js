const mongoose = require('mongoose');
const {Schema} = mongoose;

const Userschema = new Schema({
    object_id:{
        type:String,
        trim:true,
        required:true
    },
    subject_one:{
        type:String,
        trim:true,
        required: true
    },
    subject_one_mark:{
        type:Number,
        trim:true,
        required:true
    },
    subject_two:{
        type:String,
        trim:true,
        required: true
    },
    subject_two_mark:{
        type:Number,
        trim:true,
        required:true
    },
    subject_three:{
        type:String,
        trim:true,
        required: true
    },
    subject_three_mark:{
        type:Number,
        trim:true,
        required:true
    },
    subject_four:{
        type:String,
        trim:true,
        required: true
    },
    subject_four_mark:{
        type:Number,
        trim:true,
        required:true
    },
    subject_five:{
        type:String,
        trim:true,
    },
    subject_five_mark:{
        type:Number,
        trim:true,
    },
    subject_six:{
        type:String,
        trim:true,
    },
    subject_six_mark:{
        type:Number,
        trim:true,
    },
},{timestamps:true});

const Marks = mongoose.model('mark', Userschema);
module.exports = Marks;