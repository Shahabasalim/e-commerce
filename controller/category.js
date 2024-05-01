const categoryModel=require('../model/category')


module.exports={
categoriesGet:async(req,res)=>{
    const categories = await categoryModel.find()
    console.log(categories);
    res.render('admin/categories',{categories})
},
categoriespost:(req,res)=>{
 res.render()
},
addcategoryget:(req,res)=>{
    res.render('admin/addcategory')
},
addcategorypost:async(req,res)=>{
    const{category,subcategory}=req.body
    const datas=subcategory.split(',')
    console.log(datas)

    const image =req.file.filename
    const categoryData={
        category:category,
        subcategory:datas,
        image:image
    }
    console.log(categoryData);
    const allData=new categoryModel(categoryData)
    await allData.save()
    res.redirect('/addcategory')

},
deletecategoryget:async(req,res)=>{
   const deleteId=req.params.id
   await categoryModel.findByIdAndDelete(deleteId);
   res.status(200).json({success:true})
   
},





}



