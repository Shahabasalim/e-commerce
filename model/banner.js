
const mongoose=require("mongoose")

const bannerSchema=new mongoose.Schema({
 
    name:String,
    description:String,
    image:String
  
})

module.exports=mongoose.model('banner',bannerSchema)
