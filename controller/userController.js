const addressSchema = require('../model/address')
const productSchema = require("../model/product")
const signupSchema = require('../model/signup')
const cartSchema=require("../model/cart")
const { name } = require('ejs')


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
        const Cart=await cartSchema.findOne({userId:userId}).populate({path:"products.productId",model:"product"})
        const totalAmount=Cart?.products.reduce((acc,data)=>{
            return acc+=data.productId.product_price 
        },0)
        console.log(totalAmount);
        
      
        
        res.render("user/home1",{ products,Cart, isUserAvailable,totalAmount})
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


    
 addressPost : async (req, res) => {
        if (req.session.email) {
            const userid = req.session.userId;
            console.log(userid);
            const { name, locality, district, address, address2, city, state, number, pincode } = req.body;
            
            try {
                const userAddress = await addressSchema.findOne({ userId: userid });
                if (userAddress) {
                    // User exists, push the new address to the addresses array
                    userAddress.address.push({
                        name: name,
                        locality: locality,
                        district: district,
                        address: address,
                        address2: address2,
                        city: city,
                        state: state,
                        phonenumber: number,
                        pincode: pincode
                    });
                    await userAddress.save();
                } else {
                    // User does not exist, create a new document
                    const newUserAddress = new addressSchema({
                        userId: userid,
                        address: [{
                            name: name,
                            locality: locality,
                            district: district,
                            address: address,
                            address2: address2,
                            city: city,
                            state: state,
                            phonenumber: number,
                            pincode: pincode
                        }]
                    });
                    await newUserAddress.save();
                }
                res.redirect('/profile');
            } catch (error) {
                console.error(error);
                res.status(500).send("Error saving address");
            }
        } else {
            res.redirect('/login');
        }
    },    
    profileget: async (req, res) => {
        if (req.session.email) {
            const userId = req.session.userId
            const user = await addressSchema.findOne({ userId: userId })
            const signup=await signupSchema.findOne({email:req.session.email})
            // console.log(user.address[0].name);
            res.render('user/profile', { data:signup, addresses:user || ''  })
        } else {
            res.redirect('/login')
        }
    },
    profilepost: (req, res) => {
        console.log(req.body);
        res.redirect('/')
    }
}





