const User = require('../models/userModel');
const expressAsyncHandler = require('express-async-handler');
const bycript = require('bcrypt');
const { generateToken, generateTokenConfirm } = require('../utils');
const { MAILGUN_API_KEY } = require('../config/config');

//mailgun config
const mailgun = require('mailgun-js');
const DOMAIN = 'sandboxa6f1fb4cd9d24664950b2a0be2e4f525.mailgun.org';
const mg = mailgun({apiKey: MAILGUN_API_KEY, domain: DOMAIN});

//template
const userValidation = require('../services/templateValidation');

exports.signin = expressAsyncHandler(async(req,res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});

    if(!user) return res.status(400).send({message:'user is not exist'});

    if(user.status !== 'Active') {
        return res.status(401).send({message: 'Pending Account. Please Verify Your Email!'});
    };


    let token = generateToken(user);

    const correctPassword = await bycript.compare(password, user.password);

    if(!correctPassword) return res.status(400).send({message: 'invalid password'});

    res.send({
            _id: user._id, 
            name: user.name, 
            email: user.email, 
            isAdmin: user.isAdmin, 
            isSeller: user.isSeller,
            token
        }); 
});

exports.createUser = expressAsyncHandler(async(req,res) => {
    const body = req.body;

    let user;
    user = await User.findOne({email: body.email});

    if(user) return  res.status(400).send({message: 'user is already exist'});
    
    const token = generateTokenConfirm();

    user = new User({
        name: body.name,
        email: body.email,
        phone: body.phone,
        password: bycript.hashSync(body.password, 8),
        age: body.age,
        gender: body.gender,
        confirmationCode: token
    });

    await user.save();

    const data = {
        from: 'real@gmail.com',
        to: body.email,
        subject: 'Account Activation Link',
        html: userValidation(body.name,token)
    };

    mg.messages().send(data, function (error, body) {
        if(error){
            return res.send({message: error.message})
        }
        res.send({message: 'Se te ha mandado un correo electronico para confirmar que tu email sea valido',});
        console.log(body);
    });
});

exports.activeAccount = expressAsyncHandler(async(req,res) => {
    const token = req.params.token;
    const user = await User.findOne({confirmationCode: token});

    if(!user) return res.status(404).send({message: 'user not found'});
    user.status = 'Active';

    await user.save();

    res.redirect('http://localhost:3000/signin');
});

