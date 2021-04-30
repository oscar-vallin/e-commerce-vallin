const Product = require('../models/productModel');
const expressAsyncHandler = require('express-async-handler');

exports.getProducts = expressAsyncHandler( async (req, res) => {
    const seller = req.query.seller || '';
    const order = req.query.order || '';
    const name = req.query.name || '';
    const category = req.query.category || '';
    const min = req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max = req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const rating = req.query.rating && Number(req.query.rating) !== 0 ? Number(req.query.rating) : 0;
    

    const sellerFilter = seller ? {seller} : {};
    const nameFilter = name ? {name: {$regex: name, $options: 'i'}} : {};
    const categoryFilter = category ? {category} : {};
    const priceFilter = min && max ? {price: {$gte: min, $lte: max}} : {};
    const ratingFilter = min && max ? {price: {$gte: rating}} : {};
    const sortOrder = order === 'lowest'?{price:1}: order === 'highest'?{price: -1}: order === 'toprated'?{price:-1}:{_id: -1}

    const products = await Product.find({
        ...sellerFilter,
        ...nameFilter,
        ...categoryFilter,
        ...priceFilter,
        ...ratingFilter,
    }).populate('seller', 'seller.name seller.logo').sort(sortOrder);

    res.send(products);
});

exports.getProductByCategories = expressAsyncHandler( async (req,res) => {
    const categories = await Product.find().distinct('category');
    console.log(categories)
    res.send(categories);
});

exports.getProductByIdAndFeaturesSeller = expressAsyncHandler( async (req,res) => {
    const id = req.params.id;

    const product = await Product.findById(id).populate(
        'seller', 
        'seller.name seller.logo seller.rating seller.numReviews');

    if(product){
        res.json(product)
    }else{
        res.status(404).send({message: 'product not found'})
    }
});

exports.createProduct = expressAsyncHandler( async (req,res)  => {
    const body = req.body;
    const product = new Product({
        name: body.name,
        seller: req.user._id,
        image: body.image,
        brand: body.brand,
        category: body.category,
        description: body.description,
        price: body.price,
        countInStock: body.countInStock,
        rating: 0,
        numReviews: 0

    });

    const createdProduct = await product.save();
    res.send({message: 'created product', product: createdProduct});
});

exports.editProductById = expressAsyncHandler( async (req,res)  => {
    const { name, price, image, category, brand, countInStock, description } = req.body;
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if(product){
        product.name = name;
        product.price = price;
        product.image = image;
        product.category = category;
        product.brand = brand;
        product.countInStock = countInStock;
        product.description = description;
        const updateProduct = await product.save();
        res.send({message: 'product updated', product: updateProduct});
    }else{
        res.status(404).send({message: 'product does not exist'});
    }
});

exports.deleteProduct = expressAsyncHandler( async (req,res)  => {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if(product){
        const deleteProduct = await product.remove();
        res.send({message: 'Product Deleted', product: deleteProduct});
    }else{
        res.status(404).send({message: 'Product not Found'});
    }
});