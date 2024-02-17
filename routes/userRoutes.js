// routes/userRoutes.js

const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin"); 
const { loginRules, registerRules, validator } = require("../middlewares/validator");

// ... (your existing code)

// Set admin role for a user
router.put("/set-admin/:userId", isAuth, isAdmin, async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ msg: "User not found" });
        }

        user.role = "admin";
        await user.save();

        res.send({ msg: "User role updated to admin" });
    } catch (error) {
        console.error("Error setting admin role:", error);
        res.status(500).send({ msg: "Internal Server Error" });
    }
});
router.post("/register",registerRules(),validator,async(req,res)=>{
    const{name,email,lastName,password}=req.body

    let user=await User.findOne({email})
    if(user){
        return res.send({msg:"email already exists"})
    }
user=new User({name,email,lastName,password})


const salt=10

const hashedPassword= await bcrypt.hash(password,salt)
user.password=hashedPassword
await user.save()

const payload={
    id:user._id
}
const token=jwt.sign(payload,"fghgdf",{expiresIn:"7 days"})

res.send({msg:"user created successfuly !! ",user,token})

})
//login user
router.post("/login",loginRules(),validator,async(req,res)=>{
    const{email,password}=req.body

let user=await User.findOne({email})

if(!user){
    return res.send({msg:"bad credentials !"})
}

const  passwordMatch=await bcrypt.compare(password,user.password)
if(!passwordMatch){
return res.send({msg:"bad credentials !"})
}

const payload={
    id:user._id
}
const token=jwt.sign(payload,"fghgdf",{expiresIn:"7 days"})

res.send({msg:`Si ${user.name} is connected`,user,token})

})

//get authorized user

router.get("/user",isAuth,(req,res)=>{
res.send({user:req.user})

})


module.exports = router;


