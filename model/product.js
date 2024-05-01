const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    product_name:String,
    product_description:String,
    product_price:Number,
    Image:Array,
    quantity:Number,
    discount:Number,
    size:String,
})
module.exports= mongoose.model("product",productSchema)









