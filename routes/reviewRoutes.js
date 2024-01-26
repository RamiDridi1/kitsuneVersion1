const express=require("express")
const router=express.Router()
const Review=require("../models/review")
//testt 
router.get("/",(req,res)=>{
    res.send("hello")
})

//add review
router.post ("/add",async(req,res)=>{
    console.log(req.body,"hellooooo")
    const {title,body}=req.body
    
    const newReviw=new Review({
        title,body,image
    })
   
  const review= await newReview.save()

  res.send({msg:"review added",review})
    
})

/*delete review*/
router.delete("/delete/:_id",async(req,res)=>{
    const {_id}=req.params
    const review= await Review.findOneAndDelete({_id})
    res.send({msg:"user deleted",review})
})

//edit review

router.put("/edit/:_id",async(req,res)=>{
    const{_id}=req.params
    const review=await Review.findByIdAndUpdate({_id},{$set:req.body},{new:true})
    res.send({msg:"review edited",review})
})

//fetch data
router.get("/getall",async(req,res)=>{
    const reviews=await Contact.find()
    res.send({msg:"review fetched",reviews})
})


module.exports=router