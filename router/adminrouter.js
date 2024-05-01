const express=require('express')
const router=express.Router()
const multer=require("multer")
const storage = require('../middlewares/multer')
const upload=multer({storage})

const admincontroller=require('../controller/adminController')
const product=require('../controller/product')
const category=require('../controller/category')
const banner=require('../controller/banner')



 router.get('/adminHome',admincontroller.adminHomeGet)
      .get('/adminlogin',admincontroller.adminloginget)
      .post('/adminlogin',admincontroller.adminloginpost)
      .get('/adminsignup',admincontroller.adminsignupget)
      .post('/adminsignup',admincontroller.adminsignuppost)



      .get('/addproduct',product.adminaddproductget)
      .post('/addproduct',upload.array('image',5),product.adminaddproductpost)
      .get('/updateproduct/:id',product.updateproductget)
      .post('/updateproduct/:id',upload.array('image',5),product.updateproductpost)
      .get('/deleteproduct/:id',product.deleteproductget)
      .get('/productList',product.productListGet)

      
      .get('/addcategory',category.addcategoryget)
      .post('/addcategory',upload.single('image'),category.addcategorypost)
      .get('/categories',category.categoriesGet)
      .post('/categories',category.categoriespost)
      .delete('/deletecategory/:id',category.deletecategoryget)
      

      .get('/bannerlist',banner.bannerlistget)
      .post('/bannerlist',upload.single('image'),banner.bannerlistpost)
     
      


      
      


      
       


    


      




     
      


      

    












module.exports=router;

