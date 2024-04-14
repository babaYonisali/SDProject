const mongoose=require('mongoose')
const connectDB= async()=>{
    try{
        mongoose.set('strictQuery',false);
        const conn= await mongoose.connect("mongodb+srv://2460755:79BW9cJcz3WmsnlI@user.oqrmcie.mongodb.net/SdProjectDB");
        console.log(`Database connected: ${conn.connection.host}`)
    }catch(error){
        console.log(error)
    }
}
module.exports=connectDB;