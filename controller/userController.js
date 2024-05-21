const addressSchema = require('../model/address')
const productSchema = require("../model/product")
const signupSchema = require('../model/signup')
const cart=require("../model/cart")


module.exports = {
    userHomeGet: async (req, res) => {
        let isUserAvailable=false;
        if(req.session.email){
            isUserAvailable=true
        }
        const productid = req.query.id || `null`
        // console.log(productid,'hai there');
        const products = await productSchema.find()
        const userId=req.session.userId;
        const Cart=await cart.findOne({userId}).populate({path:"products.productId",model:"product"})
        // console.log(Cart.total);
        res.render("user/home1",{ products,Cart, isUserAvailable})
    },
    userhomepost:(req,res)=>{
        res.redirect('/login')
    },
    aboutget: async (req, res) => {
        res.render("user/about")
    },
    addressGet: async (req, res) => {
        res.render('user/address')
    },


    addressPost: async (req, res) => {
        if (req.session.email) {
            const userid = req.session.userId
            console.log(userid);
            const { locality, district, address, address2, city, state, phonenumber, pincode } = req.body;
            try {
                const userAddress = new addressSchema({
                    userId: userid,
                    address: {
                        locality: locality,
                        district: district,
                        address: address,
                        address2: address2,
                        city: city,
                        State: state,
                        pincode: pincode
                    }
                });
               
                await userAddress.save();
                res.redirect('/profile');
            } catch (error) {
                console.error(error);
                res.status(500).send("Error saving address");
            }
        } else {
            res.redirect('/login')
        }

    },
    profileget: async (req, res) => {
        if (req.session.email) {
            const userId = req.session.userId
            const user = await addressSchema.find({ userId: userId })
            const signup=await signupSchema.findOne({email:req.session.email})
            console.log(user[0].address);
            res.render('user/profile', { data:signup, address:user })
        } else {
            res.redirect('/login')
        }
    },
    profilepost: (req, res) => {
        console.log(req.body);
        res.redirect('/')
    }
}





