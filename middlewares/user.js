const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../publickey");

function UserAuthenticator(req,res,next){

    const token = req.headers.authorization;
    const jwtToken = jwt.verify(token , JWT_SECRET);

    if(jwtToken.username){
        req.username = jwtToken.username;
        next();
    }else{
        res.status(403).json({
            msg : "User is not Authenticated"
        })
    }

}


module.exports = UserAuthenticator