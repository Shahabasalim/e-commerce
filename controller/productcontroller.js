module.exports={
    productget:(req,res)=>{
        res.render('user/product')
    },
    productpost:async(req,res)=>{
        console.log(req.body);
       res.redirect('/')
    },

    
    

    
}