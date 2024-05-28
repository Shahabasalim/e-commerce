const checkoutSchema=require('../model/checkout')
const signupSchema  = require("../model/signup");
const addressSchema=require("../model/address")
const cartSchema=require("../model/cart")
const {ObjectId}=require('mongodb')

const mongoose=require('mongoose');
const { log } = require('console');

module.exports={
 checkoutget : async (req, res) => {
    if (req.session.email) {
        try {
            const email = req.session.email;
            const user = await signupSchema.findOne({ email: email });
            if (!user) {
                console.log("User not found, redirecting to login");
                return res.redirect("/login");
            }

            const userId = user._id;
            const cartData = await cartSchema.findOne({ userId: userId });

            const userprofile = await addressSchema.find({ userId: userId });

            console.log("User Profile:", userprofile);

            if (userprofile && userprofile.address && userprofile.address.length > 0) {
                console.log("Addresses found:", userprofile.address.length);
            } else {
                console.log("No addresses found for the user");
            }

            const addresses = userprofile 

            res.render("user/checkOut", { cartData, addresses });
        } catch (err) {
            console.error('Error fetching user data:', err);
            res.status(500).send('Internal Server Error');
        }
    } else {
        res.redirect("/login");
    }
},
    
        checkoutpost:async(req,res)=>{
          try {
      if (req.session.email) {
        const { paymentAddress, paymentMethod } = req.body;
        const newAddress = paymentAddress.trim();
        req.session.paymentMethod = paymentMethod;
        req.session.paymentAddress = newAddress;
  
        const email = req.session.email;
        const user = await User.findOne({ email: email });
  
        if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
        }
  
        const userId = user._id;
  
        if (paymentMethod === "COD") {
          const cartdetail = await cartSchema.findOne({ userId: userId }).populate("products.productId");
          const checkoutData = await checkOut.findOne({ userId: userId });
          const total = checkoutData.total;
  
          const newData = new orderSchema({
            userId: userId,
            products: cartdetail.products,
            totalPrice: total,
            address: newAddress,
            paymentMethod: paymentMethod,
          });
  
          await newData.save();
  
          return res.status(200).json({ success: true, COD: true });
        } else if (paymentMethod === 'razorpay') {
          const checkoutData = await checkOut.findOne({ userId: userId });
          const price = checkoutData.total;
  
          const options = {
            amount: price * 100, // amount in the smallest currency unit
            currency: "INR",
          };
  
          try {
            const razorpayOrder = await instance.orders.create(options);
            return res.status(200).json({ success: true, razorpayOrder });
          } catch (error) {
            console.error("Razorpay Order Creation Error: ", error);
            return res.status(500).json({ success: false, message: "Razorpay Order Creation Failed" });
          }
        }
      } else {
        return res.redirect('/userLogin');
      }
    } catch (err) {
      console.error("Server Error: ", err);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  
  },

}
        
    
    







