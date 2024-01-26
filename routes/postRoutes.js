const express=require("express")
const router=express.Router()
const Post=require("../models/post")
//testt 
router.get("/",(req,res)=>{
    res.send("hello")
})

//add post
router.post("/add",async(req,res)=>{
    console.log(req.body,"hellooooo")
    const {title,body,image}=req.body
    
    const newPost=new Post({
        title,body,image
    })
   
  const post= await newPost.save()

  res.send({msg:"post added",post})
    
})

/*delete post*/
router.delete("/delete/:_id",async(req,res)=>{
    const {_id}=req.params
    const post= await Post.findOneAndDelete({_id})
    res.send({msg:"user deleted",post})
})

//edit post

router.put("/edit/:_id",async(req,res)=>{
    const{_id}=req.params
    const post=await Post.findByIdAndUpdate({_id},{$set:req.body},{new:true})
    res.send({msg:"post edited",post})
})
//fetch data
router.get("/getall",async(req,res)=>{
    const posts=await Contact.find()
    res.send({msg:"post fetched",posts})
})


module.exports=router