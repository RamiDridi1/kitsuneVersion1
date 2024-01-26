const mongoose=require("mongoose")

connectDB=()=>{
    mongoose.connect("mongodb+srv://ramigypatex:rami7042001@kitsune.schpq54.mongodb.net/finalproject")
    .then(()=>console.log("mongoDB connected ..."))
    .catch((err)=>console.log(err))
}

module.exports=connectDB

