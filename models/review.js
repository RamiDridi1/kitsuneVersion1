const mongoose=require("mongoose")
const schema=mongoose.Schema

const ReviewSchema=new schema({
    title:{
        type:String
    },
    body:{
        type:String
    },

})

module.exports=Review=mongoose.model("Reviews",ReviewSchema)