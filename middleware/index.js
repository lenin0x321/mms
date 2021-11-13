const expressjwt = require('express-jwt');

exports.requiredSigin = expressjwt({
    getToken: (req,res)=>req.cookies.token,
    secret: process.env.jwt_securt,
    algorithms: ["HS256"],
});
