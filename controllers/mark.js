const Student = require('../modules/student');
const Marks = require('../modules/marks');
exports.info = async(req,res)=>{
    try{
        let objectid = req.params._id
        user_info = await Student.findOne({objectid}).exec();
        res.status(200).send(user_info);
    }catch(err){
        console.log(err)
    }
}
exports.addmarks = async(req,res)=>{
    try{
        let objectid = req.params._id;
        const {subject_one,subject_two,subject_three,subject_four,subject_five,subject_six,subject_one_mark,subject_two_mark,subject_three_mark,subject_four_mark,subject_five_mark,subject_six_mark} = req.body
        console.log(subject_one)
        const user_save =new Marks({
            object_id : objectid,
            subject_one:subject_one,
            subject_one_mark:subject_one_mark,
            subject_two:subject_two,
            subject_two_mark:subject_two_mark,
            subject_three:subject_three,
            subject_three_mark:subject_three_mark,
            subject_four:subject_four,
            subject_four_mark:subject_four_mark,
            subject_five:subject_five,
            subject_five_mark:subject_five_mark,
            subject_six:subject_six,
            subject_six_mark : subject_six_mark,
        })
        await user_save.save();
        res.send('okay')
    }catch(err){
        console.log(err)
    }

}
exports.getmarks =async(req,res)=>{
    try{
        let obj = req.params._id
        user_marks = await Marks.findOne({obj}).exec();
        res.status(200).send(user_marks)
    }catch(err){
        console.log(err)
    }
}