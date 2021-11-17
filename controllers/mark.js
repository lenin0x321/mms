const {Client} = require('pg');
const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "lenin@123",
    database: "postgres"
})
client.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
exports.info = async(req,res)=>{
    try{
        let objectid = req.params._id
        console.log(objectid)
        user_info = await client.query('SELECT * FROM Users WHERE id=$1',[objectid]);
        res.status(200).send(user_info.rows);
    }catch(err){
        console.log(err)
    }
}
exports.addmarks = async(req,res)=>{
    try{
        let objectid = req.params._id;
        const {subject_one,subject_two,subject_three,subject_four,subject_five,subject_six,subject_one_mark,subject_two_mark,subject_three_mark,subject_four_mark,subject_five_mark,subject_six_mark} = req.body
        await client.query("INSERT INTO marks(object_id,subject_one,subject_one_mark,subject_two,subject_two_mark,subject_three,subject_three_mark,subject_four,subject_four_mark,subject_five,subject_five_mark,subject_six,subject_six_mark) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *",[objectid,subject_one,subject_two,subject_three,subject_four,subject_five,subject_six,subject_one_mark,subject_two_mark,subject_three_mark,subject_four_mark,subject_five_mark,subject_six_mark]);
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