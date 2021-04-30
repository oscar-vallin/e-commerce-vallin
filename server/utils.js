const jwt = require('jsonwebtoken');
const { JSON_SECRET } = require('./config/config');

exports.generateToken =  user =>  {

    return jwt.sign({
        _id: user._id,
        name: user.name,
        phone: user.phone,
        age: user.age,
        gender: user.gender,
        email: user.email,
        isAdmin: user.isAdmin,
        isSeller: user.isSeller
    },
        JSON_SECRET,
        {
            expiresIn: '30d'
        }
    );
};

exports.generateTokenConfirm = () => {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let token = '';
    for (let i = 0; i < 25; i++) {
    token += characters[Math.floor(Math.random() * characters.length )];
    }
    return token;
};

exports.confirmEmail = (req,res,next) => {
    const  authorization  = req.headers.authorization;
    if(authorization){
        const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
        jwt.verify(token, JSON_SECRET, (err, decode) => {
            if(err){
                res.status(401).send({message: 'invalid token'});
            } else {
                
                req.user = decode;
                next();
            };
        });
    } else {
        res.status(401).send({message: 'no token'});
    }
}

exports.isAuth = (req, res, next) => {
    const  authorization  = req.headers.authorization;
    if(authorization){
        const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
        jwt.verify(token, JSON_SECRET || 'somethingsecretword', (err, decode) => {
            if(err){
                res.status(401).send({message: 'invalid token'});
            } else {
                
                req.user = decode;
                next();
            };
        });
    } else {
        res.status(401).send({message: 'no token'});
    }
};

exports.isAdmin = (req,res,next) => {
    if(req.user && req.user.isAdmin){
        next();
    }else{
        res.status(401).send({message: 'Invalid Admin Token'});
    };
};

exports.isSeller = (req,res,next) => {
    if(req.user && req.user.isSeller){
        next();
    }else{
        res.status(401).send({message: 'Invalid Seller Token'});
    };
};

exports.isSellerOrIsAdmin = (req,res,next) => {
    if(req.user && (req.user.isSeller || req.user.isAdmin)){
        next();
    }else{
        res.status(401).send({message: 'Invalid Admin/Seller Token'});
    };
};
