const express = require("express");
const router = express.Router();
const Review = require("../models/review");
const User = require("../models/user");
const isAuth = require("../middlewares/isAuth");

// ...

// Add review
router.post("/add", isAuth, async (req, res) => {
    const { title, body } = req.body;
  
    const newReview = new Review({
      title,
      body,
      user: req.user.id,
    });
  
    const review = await newReview.save();
  
    res.send({ msg: "Review added", review });
  });

// ...

module.exports = router;


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

// Fetch data including user details
router.get("/getall", async (req, res) => {
    const reviews = await Review.find().populate("user", ["name", "lastName"]);
    res.send({ msg: "review fetched", reviews });
  });
  
  module.exports = router;





