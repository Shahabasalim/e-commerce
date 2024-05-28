const cartSchema = require('../model/cart')
const User = require("../model/signup")
const mongoose = require("mongoose")
const product=require('../model/product')
const { log } = require('console')



module.exports = {
    addToCart: async (req, res) => {
        if (req.session.email) {
            try {
                const productId = req.params.id
                const email = req.session.email
                const user = await User.findOne({ email: email })
                const userobjId = user._id
                const productobjId = new mongoose.Types.ObjectId(productId)
                const cart = await cartSchema.findOne({ userId: userobjId });
                // console.log('cart:',cart);

                if (!cart) {
                    const cart = new cartSchema({
                        products: { productId: productobjId, quantity: 1 },
                        userId: userobjId,
                    });
                    await cart.save();
                    
                } else {
                    
                    //   console.log('hi');
                        const productIndex = cart.products.findIndex(product => product.productId.equals(productobjId));
        
                        if (productIndex === -1) {
                            cart.products.push({ productId: productobjId, quantity: 1 });
                        } else {
                         
                            cart.products[productIndex].quantity += 1; 
                        }
                        await cart.save();
                    }
                    res.redirect("/viewcart");
            } catch (error) {
                console.error('Error adding to wishlist:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        } else {
            res.status(202).json("message:false")
        }
    },
    
    viewcartget: async (req, res) => {
        try {
            if (req.session.email) {
                const userid = req.session.userId;
                console.log('userid:',userid);
                const viewcart = await cartSchema.findOne({ userId: userid }).populate({ path: "products.productId", model: "product" });
                const totalAmount=viewcart?.products.reduce((acc,data)=>{
                    return acc+=data.productId.product_price 
                },0)

                req.session.price=totalAmount
                console.log( req.session.price);
               
                // console.log(totalAmount ,'shahaba jfjldkj djilj');  
                

                if (viewcart && viewcart.products) {
                    res.render('user/viewcart', { viewcart: viewcart.products ,total:totalAmount });
                    
                } else {
                    res.render('user/viewcart', { viewcart: [] });  
                }
            } else {
                res.redirect('/login');
            }
            
            
        } catch (error) {
            console.error("Error fetching cart:", error);
            res.status(500).send("Internal Server Error");
        }
        
    },
    viewcartpost:(req,res)=>{
        res.render('/checkout')
    }
}




