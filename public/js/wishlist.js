const mongoose = require('mongoose')


const wishlistSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userdetails",
        required:true
    },
    productId:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"products"
        },
    ],
})

module.exports= mongoose.model('wishlist',wishlistSchema)