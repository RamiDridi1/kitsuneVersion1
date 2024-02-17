const jwt =require("jsonwebtoken")
const User=require("../models/user")
const isAuth=async(req,res,next)=>{
    try{
const token=req.headers["x-auth"]

if(!token){
    return res.send({msg:"no token !"})
}

const decoded =await jwt.verify(token,"fghgdf")

const user=await User.findById(decoded.id)

if(!user){
    return res.send("no user with this token !")
}

req.user=user
next()
    }
    catch(err){
        res.send({msg:"token not valid"})
    }

}

module.exports=isAuth

