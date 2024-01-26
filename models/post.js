const mongoose=require("mongoose")
const schema=mongoose.Schema

const PostSchema=new schema({
    title:{
        type:String
    },
    body:{
        type:String
    },
    picture:{
        type:String,

    }

})

module.exports=Post=mongoose.model("Posts",PostSchema)