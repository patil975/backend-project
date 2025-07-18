const express=require("express")
const {createProduct, getAllProducts, getProductById, updateProductById, deleteProductById} = require("../controller/productcontroller");
const { auth } = require("../middleware/auth");
const upload = require("../middleware/upload");

const router=express.Router();

router.post("/", auth, upload.single("image"),
createProduct)
router.get("/",getAllProducts);
router.get("/:id",getProductById);
router.put("/:id",updateProductById,auth, upload.single("image"),);
router.delete("/:id",deleteProductById);

module.exports=router