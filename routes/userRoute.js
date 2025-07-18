const express=require("express");
const { getAllUsers, userRegister } = require("../controller/usercontroller");

const routes=express.Router();

routes.get("/",getAllUsers);
routes.post("/register",userRegister)

module.exports=routes;


