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
    cartget:async(req,res)=>{
        if (req.session.email) {
            const email = req.session.email;
            const user = await User.findOne({ email: email });
            const userobjId = user._id;
            const cartData = await cartSchema.findOne({ userId: userobjId }).populate('products.productId');
            if (cartData && cartData.products) {
                cartCount = cartData.products.length;
                const cart = await cartSchema.updateOne(
                    {userId:userobjId},
                    {
                        productDiscounted:totalAmount,
                        productPrice:subtotal,
                        // productDiscountedAmount:discountAmount
                    }
            )}
            res.render('user/cart', { cartData ,totalAmount ,subtotal });

        }else {    
            res.redirect('/userLogin');
        }
    },
    
    viewcartget: async (req, res) => {
        try {
            if (req.session.email) {
                const userid = req.session.userId;
                const viewcart = await cartSchema.findOne({ userId: userid }).populate({ path: "products.productId", model: "product" });
                const total =viewcart?.total || 500
                
                if (viewcart && viewcart.products) {
                    res.render('user/viewcart', { viewcart: viewcart.products });
                    
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
        
    }
}




