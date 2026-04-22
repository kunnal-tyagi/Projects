const User=require('../models/User')
const jwt=require('jsonwebtoken')
const genToken=(id)=>
    jwt.sign({id},process.env.JWT_SECRET,
        {expiresIn:'7d'}
    );

exports.register=async(req,res)=>{
    const {name,email,password}=req.body;
    const exists=await User.findOne({email});
    if(exists) return res.status(404).json({message:'User already exists'});

    const user=await User.create({name,email,password});
    res.status(201).json({_id:user._id,name:user.name,token:genToken(user._id)});
}

exports.login=async (req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user || !(await user.matchPassword(password)))
         return res.status(404).json({message:'Invalid Credentials'});
    res.json({_id:user._id,name:user.name,token:genToken(user._id)}); 
}