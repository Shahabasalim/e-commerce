const wishlistSchema = require('../model/wishlist')
const ProductSchema = require('../model/product');
const { default: mongoose } = require('mongoose');
const signupSchema = require('../model/signup');
const product = require('./product');
const wishlist = require('../model/wishlist');

module.exports = {

  addToWishlist: async (req, res) => {
    if (req.session.email) {
      try {
        const productId = req.params.id;
        if (!productId) {
          return res.status(400).json({ error: 'Product ID is required' });
        }
        const email = req.session.email
        const user = await signupSchema.findOne({ email: email })
        const userObjId = user._id;
        const productObjId = productId;
        let wishlist = await wishlistSchema.findOne({ userId: userObjId });
        
        if (!wishlist) {
          const newData = new wishlistSchema({
            productId: [productObjId],
            userId: userObjId,
          });
          await newData.save();
        }else if (!wishlist.productId.includes(productObjId)) {
            await wishlistSchema.updateOne(
              { userId: userObjId },
              { $push: { productId: productObjId } }
            );
          } else {
            await wishlistSchema.updateOne(
              { userId: userObjId },
              { $pull: { productId: productObjId } }
            );
          
          }
        
        res.status(200).json({ message: 'Added to wishlist' });
      

      } catch (error) {
        console.error('Error adding to wishlist:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    } else {
      res.status(202).json("message:false")
    }
  },


  wishlistGet: async (req, res) => {
    try {
        if (req.session.email) {
            const email = req.session.email;
            const user = await signupSchema.findOne({ email: email });
            const userobjId = user._id;
            const wishdata = await wishlistSchema.find({ userId: userobjId }).populate({ path:'productId', model: 'product' });
            
            res.render('user/wishlist',{wishdata})
        } else {
            res.redirect('/login');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
},
removewishlistget:async(req,res)=>{
  console.log('hi');
  if (req.session.email) {
    try {
      const productId = req.params.id
      console.log(productId);
       
        if (!productId) {
            return res.status(400).json({ error: 'Product ID is required' });
        }
        const email = req.session.email
        const user = await signupSchema.findOne({ email: email })
        const userobjId = user._id
        const productObjId = new mongoose.Types.ObjectId(productId);
        const wishdata = await wishlistSchema.findOne({ userId: userobjId })

        if (wishdata.productId.includes(productObjId)) {
            await wishlistSchema.updateOne(
                { userId: userobjId },
                { $pull: { productId: productObjId } }
            )
        }
        res.status(200).send({message:"ok"})

        
    }catch(err){
        console.log(err)
    } 
  } 



}

}
