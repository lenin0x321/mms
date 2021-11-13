const bcrypt = require('bcrypt');

exports.hashpassword =(password)=>{
    return new Promise((resolve,reject)=>{
        bcrypt.genSalt(12,(err,salt)=>{
            if(err){
                reject(err)
            }
            bcrypt.hash(password,salt,(err,hash)=>{
                if(err){
                    reject(err)
                }
                resolve(hash)
            });
        });

    });
};

exports.comparehash = (password, hash)=>{
    return bcrypt.compare(password, hash);
};
