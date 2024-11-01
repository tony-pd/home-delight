const ProductModel = require("../model/ProductModel");

const {createFactory, getAllFactory, getByIdFactory, deleteByIdFactory, getTopFactory, getByCategoryFactory} = require("../utility/factory");

// Product Crud
const createProductHandler = createFactory(ProductModel);
const getAllProductHandler = getAllFactory(ProductModel);
const getProductById = getByIdFactory(ProductModel);
const getProductByCategory = getByCategoryFactory(ProductModel);
const deleteProductById = deleteByIdFactory(ProductModel);
const getTopProducts = getTopFactory(ProductModel);

module.exports = {
    createProductHandler,
    getAllProductHandler,
    getProductById,
    getProductByCategory,
    deleteProductById,
    getTopProducts
}