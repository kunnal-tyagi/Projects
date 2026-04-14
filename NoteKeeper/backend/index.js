const express=require('express')
const dotenv=require('dotenv')
const { default: mongoose } = require('mongoose')
dotenv.config()
const app=express()
const {router}=require("./routes/Note.routes")
app.use(express.json())
try{
  mongoose.connect(process.env.URL);
  // console.log(process.env.URL);
  
  
  console.log("Connected to Database");
  
}catch(error){
  console.log("Error connecting to DB",error);
  
}
app.get('/',(req,res)=>{
   res.send("Hello Node JS")
})

app.listen(process.env.Port,()=>{
    console.log("Hello Node JS");
    
})