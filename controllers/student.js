const Student = require('../modules/student');
const jwt = require('jsonwebtoken');
const {hashpassword, comparehash} = require('../utils/hash')
exports.createstudent = async (req,res)=>{
    try{
        const {name, password ,email} = req.body
        if(!name) return res.status.send("Name is required field.");
        if(!password||password.length <6) return res.status(400).send("Please check your password field is empty or password length min 6.");
        let userExit = await Student.findOne({email}).exec();
        if(userExit) return res.status(400).send('The email is already registered.');
        let hashedpassword = await hashpassword(password);
        const user = new Student({
            name,
            email,
            password: hashedpassword
        })
        await user.save();
        res.status(200).send('Working well !');
    }catch{
        res.status(400).send('Problem in server');
    }
    
};

exports.studentlogin = async(req,res)=>{
    try{
        const {email, password} = req.body
        user = await Student.findOne({email}).exec();
        if(!user) return res.send('User is not Found');
        let match = await comparehash(password,user.password);
        if(!match) return res.send('password is incorrect');
        const token = jwt.sign({_id:user._id},process.env.jwt_securt,{
            expiresIn:"7d"
        });
        res.cookie("token",token,{
            httpOnly:true
        });
        user.password = undefined;
        res.status(200).send(user);
    }catch{
        res.status(400).send('Error from server');
    };
};

exports.all = async(req,res)=>{
    try{
        Student.find({},(err,users)=>{
            if(err){
                console.log('Something goes wrong!')
            }
            res.send(users)
        })
    }catch(err){
        res.send(err)
    }
}

