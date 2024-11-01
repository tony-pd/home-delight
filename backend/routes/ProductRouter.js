const express = require("express");
const ProductRouter = express.Router();

const {
    createProductHandler,
    getAllProductHandler,
    getProductById,
    deleteProductById,
    getTopProducts,
    getProductByCategory
} = require("../controller/ProductController");

const sanityMiddleware = require("../middleware/sanityMiddleware");
const { checkoutHandler, verifyHandler } = require("../utility/payment");

ProductRouter.route("/")  
   .post(sanityMiddleware, createProductHandler)
   .get(getAllProductHandler);

ProductRouter.route("/top")  
   .get(getTopProducts, getAllProductHandler);

ProductRouter.route("/checkout")  
   .post(checkoutHandler);

ProductRouter.route("/verify")  
   .post(verifyHandler);

ProductRouter.route("/:productId")
   .get(getProductById)
   .delete(deleteProductById);

ProductRouter.route("/:categoryId")
   .get(getProductByCategory);

module.exports = ProductRouter;