const {hashpassword, comparehash} = require('../utils/hash')
const jwt = require('jsonwebtoken');
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
exports.register = async(req,res)=>{
    try{
        const {password ,email} = req.body
        if(!email) return res.status.send("Name is required field.");
        if(!password||password.length <6) return res.status(400).send("Please check your password field is empty or password length min 6.");
        await client.query("SELECT * FROM users WHERE name LIKE $1 ",[email],(err,result)=>{
            if(!err){
                console.log()
                if(String(result.rows).trim().length !== 0 ) return res.status(400).send('The email is already registered.');
            }
            if(err){
                console.log(err)
            }
        });
        
        let hashedpassword = await hashpassword(password);
        await client.query("INSERT INTO users(name,password) VALUES($1,$2) RETURNING *",[email,hashedpassword],(err,result)=>{
            if(!err){
                console.log(result.rows);
            }
            if(err){
                console.log(err)
            }
        })
        res.status(200).send('Working well !');
    }catch{
        res.status(400).send('Problem in server');
    }
    
};

exports.login = async(req,res)=>{
    try{
        const {email, password} = req.body
        const user = await client.query("SELECT * FROM users WHERE name LIKE $1 ",[email]);
        if(String(user.rows).trim().length === 0 ) return res.status(400).send('User is not Found');
        const json =  JSON.stringify(user.rows)
        const myjson =  JSON.parse(json.replace('[','').replace(']',''));
        let hash_pass =myjson.password
        let match = await comparehash(password,hash_pass);
        if(!match) return res.status(400).send('password is incorrect');
        const token = jwt.sign({_id:myjson.id},process.env.jwt_securt,{
            expiresIn:"7d"
        });
        res.cookie("token",token,{
            httpOnly:true
        });
        myjson.password = undefined;
        res.status(200).send(myjson);
        
    }catch{
        res.status(400).send('Error from server');
    };
};

exports.logout = (req,res)=>{
    res.clearCookie('token')
    res.send('okay')
}

exports.current_user = async (req,res)=>{
    try{
        let user = await client.query('SELECT * FROM Users WHERE id=$1',[req.user._id]);
        res.status(200).send(user.rows);
        res.send('okay')
    }catch(err){
        console.log(err)
    }

};

