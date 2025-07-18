const mongoose=require("mongoose");

const tokenSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObejectId(ObjectId),
            required:true,ref:"User"
        },
        tokenId:{
            type:String,required:true
        }
},{timestamps:true})

const TokenModel=mongoose.model("Token",tokenSchema)

module.exports=TokenModel