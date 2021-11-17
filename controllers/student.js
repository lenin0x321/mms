const jwt = require('jsonwebtoken');
const {hashpassword, comparehash} = require('../utils/hash')
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
exports.createstudent = async (req,res)=>{
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
        const result = await client.query("INSERT INTO users(name,password,role) VALUES($1,$2,$3) RETURNING *",[email,hashedpassword,'student'])
        res.status(200).send(result.rows);
    }catch{
        res.status(400).send('Problem in server');
    }
    
};


exports.all = async(req,res)=>{
    try{
        client.query("SELECT * FROM users WHERE role LIKE 'student' ",(err,users)=>{
            if(err){
                console.log('Something goes wrong!')
            }
            res.send(users.rows)
        })
    }catch(err){
        res.send(err)
    }
}

