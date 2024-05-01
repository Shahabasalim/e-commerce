const mongoose=require("mongoose")

const addressSchema=new mongoose.Schema({
     userId:{
        type:String,
     },
     address:{
      locality:String,
      district:String,
      address:String,
      address2:String,
      city:String,
      State:String,
      pincode:Number

     }

    
})

module.exports=mongoose.model('address',addressSchema)
