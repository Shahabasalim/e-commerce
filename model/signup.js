const mongoose=require("mongoose")
const signupSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String
    },
    phoneNumber:{
        type:Number
    },
    password:{
        type:String
    },
})

module.exports=mongoose.model("users",signupSchema)






