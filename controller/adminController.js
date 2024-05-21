const productModel = require("../model/product")

const { error } = require("console")



module.exports={
    adminHomeGet:async(req,res)=>{
        let Cart;
        if(req.session.email){
            Cart=true
        }else{
            Cart=false;
        }
        res.render('admin/adminHome',Cart)
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
    






