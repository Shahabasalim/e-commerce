const mongoose=require("mongoose")

const checkoutSchema=new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userdetails",
        required: true
    },
    products: [
        { productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' }, 
          quantity: { type: Number }, _id: false }
    ],

    total:{
        type:Number
    },
    address:[{
        
    }]
})


mongoose.exports=mongoose.model('checkout',checkoutSchema)