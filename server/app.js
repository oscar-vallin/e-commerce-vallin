const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const { PORT } = require('./config/config');
const userRouter = require('./routers/userRouter');
const productRouter = require('./routers/productRouter');
const orderRouter = require('./routers/orderRouter');
const uploadRouter = require('./routers/uploadRouter');

const app = express();

// 4.52
//middlaware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//database with mongodb
require('./db/db')(mongoose);

//routes
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/uploads', uploadRouter);

__dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.get('/api/config/paypal', (req,res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'AT3DA2s6-sX8_Px_Z74uTH5w8niu9okBgz71GaIbXZ5bAdM6OAFDECRbxH64IZnrWzQ8vqzLCVcG7ARw')
});

app.use((err, req, res, next) => {
    res.status(500).send({message: err.message});
});
app.listen(PORT, () => {
    console.log('server up', PORT);
});