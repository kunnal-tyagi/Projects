const mongoose=require("mongoose")

const ConnectDB=async()=>{
    const conn=await mongoose.connect(process.env.URL);
    console.log(`MongoDB connected: ${conn.connection.host} `);
    
};
module.exports=ConnectDB;