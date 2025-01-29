const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config")

function authMiddleware(req, res, next){
    const token = req.headers.authorization
    
    if(!token){
        return res.json({
            msg: "Empty Toke Authorization Error"
        })
    }

    const decoded = jwt.verify(token, JWT_SECRET)
    if(!decoded){
        return res.json({
            msg: "Invalid Token Authorization Error"
        })
    }else{
        req.userId = decoded.userId
        req.email = decoded.email
        next();
    }
}

module.exports = {
    authMiddleware
}