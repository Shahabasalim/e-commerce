const signupSchema =require('../model/signup')


module.exports={
   
    signupget:(req,res)=>{
        res.render('user/signup');
    },
    signuppost:async (req,res)=>{
        res.redirect('/login')
    },
    loginget:async(req,res)=>{
        res.render('user/login',{ messages: req.flash()})
    },
    loginpost:async (req,res)=>{
        const email= req.body.email;
        const user = await signupSchema.findOne({email:email})
        req.session.email=user.email
        res.redirect('/');
    },
    

    





   
}




  


    







    




























