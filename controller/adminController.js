const productModel = require("../model/product")

const { error } = require("console")



module.exports={
    adminHomeGet:async(req,res)=>{
        res.render('admin/adminHome')
    },
    adminloginget:(req,res)=>{
        res.render('admin/adminlogin')
    },
    adminloginpost:(req,res)=>{
        res.redirect('/adminHome')
    },
    adminsignupget:(req,res)=>{
        res.render('admin/adminsignup')
    },  
    adminsignuppost:(req,res)=>{
        res.render('admin/adminsignup')
    },
    
    
}
    






