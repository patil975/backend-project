const express=require("express");
const { addToCart, removeCartProduct, viewCart, updateCartItemQty } = require("../controller/cartcontroller");
const router=express.Router();

router.post("/add",addToCart)
router.post("/remove",removeCartProduct)
router.get("/",viewCart);
router.put("/update",updateCartItemQty);

module.exports=router;