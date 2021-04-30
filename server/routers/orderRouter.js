const express = require('express');
const { 
    getOrdersByIdSeller,
    getOrderByUser, 
    createOrder,
    detailsOrderById,
    orderPay,
    orderDeleteById,
    orderUpdateById
} = require('../controllers/orderController');
const { isAuth, isAdmin, isSellerOrIsAdmin } = require('../utils');

const orderRouter = express.Router();

//get orders by id seller
orderRouter.get('/', 
    isAuth, 
    isSellerOrIsAdmin, 
    getOrdersByIdSeller
);

//get orders by user
orderRouter.get('/mine', 
    isAuth,
    getOrderByUser, 
);

//create order by client
orderRouter.post('/', 
    isAuth, 
    createOrder
);

//get order detail by id order
orderRouter.get('/:id', 
    isAuth, 
    detailsOrderById
);

//pay the order
orderRouter.put('/:id/pay', 
    isAuth, 
    orderPay
);


orderRouter.delete('/:id', 
    isAuth, 
    isAdmin, 
    orderDeleteById
);


orderRouter.put('/:id/deliver', 
    isAuth, 
    orderUpdateById
);
module.exports = orderRouter;