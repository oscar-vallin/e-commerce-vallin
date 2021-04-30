
import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import TopSelling from '../components/TopSelling';

import { listProductsAction } from '../actions/productActions';

export const HomeScreen = () => {

    const dispatch = useDispatch();
    const productsList = useSelector(state => state.productList);

    const { loading, error, products } = productsList;

    useEffect(() => {
            dispatch(listProductsAction({}));
    },[dispatch]);

    return (
        <div>
            <div className="top-seller">
              <h2>Productos más vendidos</h2>
                {products  && (
                    <TopSelling 
                        products={products}
                    />
                )};    
                <h2>Featured Products</h2>
            </div>
            {loading ? (<LoadingBox />
            ): (
            error )?( <MessageBox variant={'danger'}>{error}</MessageBox>
            ):(
                <>

                {products && products.length === 0 && <MessageBox variant="danger">Not Products Found</MessageBox>}
                <div className="row center">
                {products.map(product => ( 
                    <Product 
                        key={product._id}
                        product={product}
                    />
                ))};
                 </div>
                </>
            )}
        </div>
    );
};

export default HomeScreen;
