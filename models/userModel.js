const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const userSchema= new Schema({
    userID:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        required:true
    },
    contact:{
        type:String,
    }
})
module.exports=mongoose.model('User',userSchema)