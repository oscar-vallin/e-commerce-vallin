import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';

const TopSelling = ({products}) => {

    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        let time = true;
        if(time){
            setAllProducts(products);
        }
        return () => time = false;
    },[setAllProducts, products])
    
    return (
        <div className="carousel">
            <Carousel showArrows  autoPlay showThumbs={false}  infiniteLoop>
                {allProducts.map(product => (
                    <div key={product._id}>
                        <Link to={`/product/${product._id}`}>
                            <img src={product.image} alt={product.name} />
                            <p className="legend">{product.name}</p>
                        </Link>
                    </div>
                ))};
            </Carousel>
        </div>
    );
};

export default TopSelling;
