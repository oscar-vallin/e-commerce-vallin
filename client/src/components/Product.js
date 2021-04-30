
import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({product}) => {

    return (
        <div key={product._id} className="card">
        <Link to={`/product/${product._id}`}>
             {/* image size: 680px by 830px */}
            <img className="medium" src={product.image} alt="product"></img>
        </Link>
        <div className="card-body">
            <Link to={`/product/${product._id}`}>
                <h2>{product.name}</h2>
            </Link>
            <Rating 
                rating={product.rating}
                numReviews={product.numReviews}
            />
            <div className="row">
                <div className="price">
                    {product.price}
                </div>
                <div>
                    <Link to={`/seller/${product.seller._id}`}>
                        {product.seller.name}
                    </Link>
                </div>
            </div>   
            
        </div>
    </div>
    );
};

export default Product;
