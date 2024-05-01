const mongoose=require("mongoose")

const categorySchema=new mongoose.Schema({
    category:String,
    subcategory:Array,
    image:String,
})
module.exports=mongoose.model("category",categorySchema)