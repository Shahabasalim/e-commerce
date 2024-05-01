const addressSchema=require('../model/address')
const productSchema=require("../model/product")
const signupSchema =require('../model/signup')


module.exports={
    userHomeGet1:async(req,res)=>{
        const productid=req.query.id || `null`
        // console.log(productid,'hai there');
        const products=await productSchema.find()
        res.render("user/home1",{products})

    },
    userHomeGet2:async(req,res)=>{
        res.render("user/home2")
    },
    userHomeGet3:async(req,res)=>{
        res.render("user/home3")
    },
    aboutget:async(req,res)=>{
        res.render("user/about")
    },
    addressGet:async(req,res)=>{
         
         res.render('user/address')
    },
        

     addressPost: async (req, res) => {
            const { locality, district, address, address2, city, state, phonenumber, pincode } = req.body;
            try {
                const userAddress = new addressSchema({
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
        },
        
    profileget:async (req,res)=>{
        const data=await User.findOne()
        console.log(data)
        res.render('user/profile',{data})
    },
    profilepost:(req,res)=>{
        res.redirect('/')
    }
    
}



