const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../publickey");

function AdminAuthenticator(req,res,next){

    const token = req.headers.authorization;
    const jwtToken = jwt.verify(token , JWT_SECRET);

    if(jwtToken){
        req.username = jwtToken.username;
        next();
    }else{
        res.status(403).json({
            msg : "Admin not Authenticated"
        })
    }


}

module.exports = AdminAuthenticator;
