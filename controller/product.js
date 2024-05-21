const { rmSync } = require("fs");
const productSchema=require("../model/product")


module.exports={

adminaddproductget:(req,res)=>{
    res.status(200).render('admin/adminproduct')
},
adminaddproductpost:async (req,res)=>{
    const image=req.files.map((img)=>img.filename);
    const {product_price,discount} = req.body;
    const discounted =product_price*discount/100;
    const discountedValue=product_price-discounted
    const roundedValue = Math.round(discountedValue)  
    console.log(discountedValue,roundedValue);
    try{
       const newProduct = await productSchema.create({ ...req.body,Image:image, totalprice:roundedValue ,discount:discounted})
        res.redirect('/addproduct')
    }catch(err){
        console.error(err);
        res.status(500).send("error adding product")
    }
},

updateproductget:async(req,res)=>{
    const{id}=req.params
    const productData=await productSchema.findById(id);
    console.log(productData);
    res.render('admin/updateproduct',{productData})
},

updateproductpost:async(req,res)=>{
    const product_image=req.files.map((img)=>img.filename);
    const{id}=req.params
    const newData={...req.body}
    if(product_image.length){
        newData['product_image']=product_image
    }
    try{
    const document=await  productSchema.findById(id);
    if(!document){
        return res.status(404).json({error:'document not found'})
    }
    document.set(newData);
    await document.save()
    res.redirect('/productList')
    }catch(error){
        console.error('error updating document:',error)
        res.status(500).json({error:'internal server error'})
    }
   
}, 

deleteproductget:async(req,res)=>{
    const{id}=req.params
    const productData=await productSchema.findById(id);
    await productData.deleteOne()
    res.redirect('/productList')
    
},

productListGet:async(req,res)=>{
    const products = await productSchema.find({})
    res.render('admin/productList',{products})
},


}
