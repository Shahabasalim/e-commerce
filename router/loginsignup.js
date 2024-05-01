
const express=require('express')
const router=express.Router()
const { logVerify,signupVerify } = require("../middlewares/autenticationmiddlewares"); 

const user=require('../controller/loginsignup')


   
router.get('/login',user.loginget)
      .post('/login',logVerify,user.loginpost)
      .get('/signup',user.signupget)
      .post('/signup',signupVerify,user.signuppost)
      
      
      
     


             



      



module.exports=router;
























