const bannerSchema=require("../model/banner")

module.exports={

bannerlistget:async(req,res)=>{
    const banners = await bannerSchema.find()
    res.render('admin/bannerlist',{banners})
},
    bannerlistpost:async(req,res)=>{
    const image = req?.file?.filename
    console.log(image)
    await bannerSchema.create({
        image:image,
        name:req.body.name,
        description:req.body.description
    })
    res.redirect('/bannerlist')
    },

    

}



     