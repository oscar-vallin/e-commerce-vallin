const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const bycript = require('bcrypt');
const userValidation = require('../services/templateValidation');
const { signin, createUser, activeAccount } = require('../controllers/userController');



const { generateToken, isAuth, isAdmin, generateTokenConfirm} = require('../utils');
const User = require('../models/userModel');

const userRouter = express.Router();

userRouter.post('/signin', signin);

userRouter.post('/register', createUser);

userRouter.get('/active-account/:token', activeAccount);

userRouter.get('/:id', expressAsyncHandler(async(req,res) => {
    const userId = req.params.id;
    
    const user = await User.findById(userId);
 
    if(user){
        res.send(user);
    }else{
        res.send(404).send({message: 'user not found'});
    }
}));

userRouter.put('/profile', isAuth, expressAsyncHandler(async(req,res) => {
  
    // const { email } = req.body;
    // const userExist = await User.findOne({email});
    // if(userExist) return res.status(400).send({message: 'this email is already exist'});

    const user = await User.findById(req.user._id);

    if(user){

        user.name = await req.body.name || user.name;
        user.email = await req.body.email || user.email;
        if(user.isSeller){
            user.seller.name = await req.body.sellerName || user.seller.name;
            user.seller.logo = await req.body.sellerLogo || user.seller.logo;
            user.seller.description = await req.body.sellerDescription || user.seller.description;
        }
        if(req.body.password){
            user.password = await  bycript.hashSync(req.body.password, 8);
        }
        const updateUser = await user.save();
        const token = generateToken(updateUser);
        res.send({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
            isSeller: updateUser.isSeller,
            token
        });
    }
}));

userRouter.get('/', isAuth, isAdmin, expressAsyncHandler(async(req,res) => {
    const user = await User.find({});
    res.send(user);
}));

userRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async(req,res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if(user){
        if(user.email === 'arnoldvallin@gmail.com'){
            res.status(400).send({message: 'You can not delete admin'});
            return;
        }
        const userDeleted = await user.remove();
        res.send({message: 'User Deleted', user: userDeleted});
    }else{
        res.status(404).send({message: 'User not found'});
    }
}));

userRouter.put('/:id', isAuth, isAdmin, expressAsyncHandler(async(req,res) => {
    const userId = req.params.id;
    const body = req.body;

    const user = await User.findById(userId);
    
    if(user){
        user.name = body.name || user.name;
        user.email = body.email || user.email;
        user.isSeller = body.isSeller || user.isSeller;
        user.isAdmin = body.isAdmin || user.isAdmin;
        user.isSeller = body.isSeller || user.isSeller;
        const userUpdate = await user.save();
        res.send({message: 'User Update', user: userUpdate});
    }else{
        res.status(404).send({message: 'User Not found'});
    }
}));

module.exports = userRouter;