const Order = require('../models/orderModel');
const expressAsyncHandler = require('express-async-handler');

exports.getOrdersByIdSeller = expressAsyncHandler( async (req,res)  => {
    const seller = req.query.seller || '';
    const sellerFilter = seller ? {seller} : {};
    const orders = await Order.find({...sellerFilter}).populate('user', 'name')
    res.send(orders)
});

exports.getOrderByUser = expressAsyncHandler( async (req,res) => {
    const orders = await Order.find({user: req.user._id});
    res.send(orders)
});

exports.createOrder = expressAsyncHandler( async (req,res)  => {
    const body = req.body;
    console.log(body.orderItems[0])
    if(body.orderItems.length === 0){
        res.status(400).send({message: 'Cart is empty'})
    } else {
        const order = new Order({
            seller: req.body.orderItems[0].seller,
            orderItems: body.orderItems,
            shippingAddress: body.shippingAddress,
            paymentMethod: body.paymentMethod,
            itemsPrice: body.itemsPrice,
            shippingPrice: body.shippingPrice,
            taxPrice: body.taxPrice,
            totalPrice: body.totalPrice,
            user: req.user._id
        });
        const createdOrder = await order.save();
        res.status(201).send({message: 'New order created', order: createdOrder});
    }
});

exports.detailsOrderById = expressAsyncHandler( async (req,res) => {
    const id = req.params.id;
    const order = await Order.findById(id);
    if(order){
        res.send(order)
    }else{
        res.status(404).send({message: 'Order not found'});
    }
});

exports.orderPay = expressAsyncHandler( async (req,res) => {
    const id = req.params.id;
    const order = await Order.findById(id);
    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = { 
            id: req.body.id, 
            status: req.body.status, 
            update_time: req.body.update_time, 
            email_address: req.body.email_address 
        }
        const updateOrder = await order.save();
        res.send({message: 'order paid', order: updateOrder})
    }else{
        res.status(404).send({message: 'order not found'})
    }
}); 

exports.orderDeleteById = expressAsyncHandler ( async (req,res)  => {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);

    if(order){
        const deleteOrder = await order.remove();
        res.send({message: 'Order Deleted', order: deleteOrder});
    } else {
        res.send({message: 'order not found'});
    }
});

exports.orderUpdateById = expressAsyncHandler ( async (req,res)  => {
    const id = req.params.id;
    const order = await Order.findById(id);
    if(order){
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        order.paymentResult = { 
            id: req.body.id, 
            status: req.body.status, 
            update_time: req.body.update_time, 
            email_address: req.body.email_address 
        }
        const updateOrder = await order.save();
        res.send({message: 'Order Delivered', order: updateOrder});
    }else{
        res.status(404).send({message: 'order not found'})
    }
});