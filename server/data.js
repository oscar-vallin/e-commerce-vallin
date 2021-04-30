const bcrypt = require('bcrypt');
module.exports = () => data = {
    user: [
        {
            name: 'dayana',
            email: 'dayana@gmail.com',
            password: bcrypt.hashSync('123456', 8),
            isAdmin: true
        },
        {
            name: 'karina',
            email: 'karina@gmail.com',
            password: bcrypt.hashSync('123456', 8),
            isAdmin: false
        }
    ],
    products : [
        {
            name: "nike slim shirt uno",
            category: 'fit',
            image: '/images/p1.jpg',
            price: 120,
            brand: 'Nike',
            rating: 1,
            countInStock: 2,
            numReviews: 10,
            description: 'high quality product'
        },
        {
            name: "nike slim shirt dos",
            category: 'fit',
            image: '/images/p1.jpg',
            price: 120,
            brand: 'Nike',
            rating: 1.5,
            countInStock: 0,
            numReviews: 10,
            description: 'high quality product'
        },
        {
            name: "nike slim shirt tres",
            category: 'fit',
            image: '/images/p1.jpg',
            price: 120,
            brand: 'Nike',
            rating: 4.5,
            countInStock: 2,
            numReviews: 10,
            description: 'high quality product'
        },
        {
            name: "nike slim shirt cuatro",
            category: 'fit',
            image: '/images/p1.jpg',
            price: 120,
            brand: 'Nike',
            rating: 4.5,
            countInStock: 2,
            numReviews: 10,
            description: 'high quality product'
        },
        {
            name: "nike slim shirt cinco",
            category: 'fit',
            image: '/images/p1.jpg',
            price: 120,
            brand: 'Nike',
            rating: 4.5,
            countInStock: 2,
            numReviews: 10,
            description: 'high quality product'
        },
        {
            name: "nike slim shirt seis",
            category: 'fit',
            image: '/images/p1.jpg',
            price: 120,
            brand: 'Nike',
            rating: 4.5,
            countInStock: 2,
            numReviews: 10,
            description: 'high quality product'
        },
    ]
}

