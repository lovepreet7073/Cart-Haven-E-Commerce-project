const jwt = require("jsonwebtoken")
console.log(process.env.SECRET_KEY,"process.env.SECRET_KEY")
const generateToken=(userId)=>{
    const token = jwt.sign({userId},process.env.SECRET_KEY,{expiresIn:"48h"})
    return token;
}

const getUserIdByToken=(token)=>{
    const decodedToken = jwt.verify(token,process.env.SECRET_KEY)
    return decodedToken.userId;
}

module.exports = {
    generateToken,getUserIdByToken
}