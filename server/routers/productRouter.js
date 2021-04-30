const express = require('express');

const { 
    getProducts, 
    getProductByCategories, 
    getProductByIdAndFeaturesSeller,
    createProduct,
    editProductById,
    deleteProduct
} = require('../controllers/productController');

const { isAuth, isAdmin, isSellerOrIsAdmin } = require('../utils');

const productRouter = express.Router();

//get products and get products by features
productRouter.get('/', getProducts);

//get products by categories
productRouter.get('/categories', getProductByCategories);

//get product by id and features about seller
productRouter.get('/:id', getProductByIdAndFeaturesSeller);

//create product
productRouter.post('/', 
    isAuth, 
    isSellerOrIsAdmin,
    createProduct, 
);

//edit product by id
productRouter.put('/:id/edit', 
    isAuth, 
    isSellerOrIsAdmin,
    editProductById
);

//delete product by id
productRouter.delete('/:id', 
    isAuth, 
    isAdmin, 
    deleteProduct
);

module.exports =  productRouter;