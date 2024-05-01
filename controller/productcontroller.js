module.exports={
    productget:(req,res)=>{
        console.log('shahaba pottathi')
        res.render('user/product')
    },
    productpost:async(req,res)=>{
        console.log(req.body);
       res.redirect('/')
    },

    
    

    
}