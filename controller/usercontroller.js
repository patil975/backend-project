const express=require("express");
const UserModel=require("../model/User");
const bcrypt=require("bcryptjs");
const ProductModel = require("../model/Product");
exports. getAllUsers=async(req,res,next)=> {
try{
    const users=await UserModel.UserModel.find();
    res.status(200).json(users);
}catch(error){
    next(error)
}
}

exports.userRegister=async(req,res,next) => {
const {name,email,password,role}=req.body;
try{
 const exitUser=await UserModel.findOne({email});
 if(exitUser){
    return res.status(400).json({message:"User already register"}) 
 }
   
    const newPassword=await bcrypt.hash(password,10);
    console.log(newPassword)
const user=await UserModel.create({name,email,password:newPassword,role})
res.status(201).json({message:"User registered Successfully"})  

}catch(error){
    next(error)
}
}