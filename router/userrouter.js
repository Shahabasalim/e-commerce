const express=require('express')
const router=express.Router()

const user=require('../controller/userController')
const cart=require("../controller/cartcontroller")
const contact=require("../controller/contactcontroler")
const product=require("../controller/productcontroller")
const address=require("../controller/userController")
const profile=require("../controller/userController")
const wishlist=require("../controller/wishlist")
const productdeatils=require('../controller/productdeatils')
const checkout=require('../controller/checkout')

router.get('/',user.userHomeGet)
      .get('/about',user.aboutget)
      // .get('/user/home1',cart.cartget)
      .get('/contact',contact.contactget)
      .get('/product',product.productget)
      .get('/address',address.addressGet)
      .post('/address',address.addressPost)
      .get('/profile',profile.profileget)
      .post('/profile',profile.profilepost)
      .get('/wishlist',wishlist.wishlistGet)
      .post('/addToWishlist/:id',wishlist.addToWishlist)
      .get('/productdetail',productdeatils.productdetailsget)
      .get("/viewcart",cart.viewcartget)
      .post('/addToCart/:id',cart.addToCart)
      .get('/checkout',checkout.checkoutget)
      .post('/checkoutpost',checkout.checkoutpost)
      .post('/checkout/change-address', checkout.changeAddress)
      
      





      
module.exports=router;