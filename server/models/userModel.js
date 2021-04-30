const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({    
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: false
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true
    },
    isSeller: {
        type: Boolean,
        default: false,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Active'],
        default: 'Pending'
    },
    confirmationCode: {
        type: String,
        unique: true
    },
    seller: {
        name: String,
        logo: String,
        description: String,
        raiting: {type: Number, default: 0, required: true},
        numReviews: {type: Number, default: 0, required: true},
    }
    
},
    {
        timestamps: true
    }
   
);

const User = mongoose.model('User', userSchema);

module.exports = User;