const { default: mongoose } = require("mongoose")


const cartSchema=new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true
    },
    products: [
        { productId: { type: mongoose.Types.ObjectId, ref: 'product' }, 
          quantity: { type: Number }, _id: false }  
    ],
    total:{
        type:Number,
    }

})

module.exports = mongoose.model("cart", cartSchema);