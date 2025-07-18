const ProductModel = require("../model/Product");
const Rating = require("../model/Rating");

exports.createProduct=async (req,res,next) => {
let {name,category,description,price,quantity,rating,imageUrl}=req.body;
    try{
         if (req.file) {
    imageUrl = `/uploads/${req.file.filename}`;
    }
const product=await ProductModel.create({name,category,description,price,quantity,rating,imageUrl})
res.status(201).json({
    message:"Product created successfully",
    product})
    }catch(error){
        next(error)
        
    }
}

exports.getAllProducts=async (req,res,next) => {
    try{
    const products=await ProductModel.find();
    res.status(200).json(products)
    }catch(error){
        next(error)
    }
}

exports.getProductById=async (req,res,next) => {
        const {id}=req.params;
        try{
            const product=await ProductModel.findById(id);
            if(!product){
                const error=new Error("Product does not exits");
                error.statusCode=400;
                throw error
            }
            const ratings =await Rating.find({ id});
     let averageRating = 0;
    if (ratings.length > 0) {
      const sum = ratings.reduce((total, rating) => total + rating.rating, 0);
      averageRating = sum / ratings.length;
    }
    const response = {
      ...product.toObject(),
      averageRating: parseFloat(averageRating.toFixed(1)),
      totalRatings: ratings.length,
      outOf5: 5,
    };

    res.json(response);
        }catch(error){
            next(error)
     }
    }

exports.updateProductById=async (req,res,next) => {
        const {id}=req.params;
        const {name,category,description,price,quantity,rating,imageUrl}=req.body;
        try{
            const product=await ProductModel.findById(id);
            if(!product){
                const error=new Error("Product does not exits");
                error.statusCode=400;
                throw error
            }
            const updateProduct=await ProductModel.updateOne({_id:id},{$set:{
                name,category,description,price,quantity,rating,imageUrl
            }})
             if (req.file) {
    imageUrl = `/uploads/${req.file.filename}`;
    }
            res.status(202).json({message:"Product update",product:updatedProduct,})
        }catch(error){
            next(error)
        }
    }

    exports.deleteProductById=async(req,res,next)=> {
        const {id}=req.params;
        try{
            const deletedproduct=await ProductModel.findByIdAndDelete(id)
            if(!deletedproduct){
                const error=new Error("Product does not exits");
                
            }
            res.status(202).json({message:"Product deleted  successfully"})
        }catch(error){
            next(error)
        }
    }