const wishlistSchema = require('../model/wishlist')
const ProductSchema = require('../model/product');
const { default: mongoose } = require('mongoose');
const signupSchema= require('../model/signup');
const product = require('./product');

module.exports = {

    addToWishlist: async (req, res) => {
        try {
          if (req.session.email) {
            const email = req.session.email
            const user = await signupSchema.findOne({ email: email })
            const userobjId = user._id
            let wishlistId;
            let wishlistData = await wishlistSchema.findOne({
              user: userobjId,
              product: id,
            });
            wishlistData?.product.forEach((data) => {
              if(data==id){
                wishlistId=id;
              }
            });
            if(wishlistId) {
              await wishlistSchema.findOneAndUpdate(
                { user: userobjId },
                { $pull: { product: id } },
                { new: true }
              );
            } else {
                await wishlistSchema.findOneAndUpdate(
                { user: userobjId },
                { $push: { product: id } },
                { upsert: true, new: true }
              );
            }
          }
          res.status(200).json({success:true})
        } catch (error) {
          console.log(error);
        }
      },

    wishlistGet: async (req, res) => {
        if (req.session.email) {
            const email = req.session.email
            const user = await signupSchema.findOne({ email: email })
            const userobjId = user._id
            const wishdata = await wishlistSchema.findOne({ userId: userobjId }).populate({ path: 'productId', model: 'products' })
            console.log(wishdata);
            res.render('user/wishlist', { wishdata })

        }else {
            res.redirect('/login')
        }
    }
}
