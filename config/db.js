const mongoose=require("mongoose")
const mongourl='mongodb://localhost/Project'

const mongoDbConnect=async ()=>{
    await mongoose.connect(mongourl)
}


module.exports=mongoDbConnect



