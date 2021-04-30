import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUserAction } from '../actions/userAction';
import { listProductsAction } from '../actions/productActions';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import Rating from '../components/Rating';
import {dataImg} from '../data2';
import Product from '../components/Product';

const SellerScreen = props => {
    console.log(props.match)
    const sellerId = props.match.params.id
    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails);
    const productList = useSelector(state => state.productList);

    const { user, loading, error } = userDetails;
    const { loading: loadingProducts, error: errorProducts, products } = productList;

    useEffect(() => {
        dispatch(detailsUserAction(sellerId));
        dispatch(listProductsAction({seller: sellerId}));
    },[dispatch, sellerId])
    return (
        <div className="row top">
            <div className="col-1">
                {loading ?  <LoadingBox />
                :
                error ?  <MessageBox variant="danger">{error}</MessageBox> 
                :
                (
                    <ul className="card card-body">
                        <li>
                            <div className="row start">
                                <div className="p-1">
                                    {/* user.seller.logo */}
                                    <img src={dataImg.image} className="small" alt={user.seller.name}/>
                                </div>
                                <div className="p-1">
                                    <h1>
                                        {user.seller.name}
                                    </h1>
                                </div>
                            </div>
                        </li>
                        <li>
                            <Rating rating={user.seller.rating} numReviews={user.seller.numReviews}/>
                        </li>
                        <li>
                            <a href={`mailto:${user.email}`}>Contact Seller</a>
                        </li>
                        <li>
                            {user.seller.description}
                        </li>
                    </ul>
                )}
            </div>
            <div className="col-3">
            {loadingProducts ?  (<LoadingBox />
                ):
                errorProducts ? (<MessageBox variant="danger">{errorProducts}</MessageBox> 
                ):( 
                    <>
                        {products.length === 0 && <MessageBox variant="danger">Not products Found</MessageBox>}
                        <div className="row center">
                            {products.map(product => (
                                <Product
                                    key={product._id}
                                    product={product}
                                />    
                            ))}
                        </div>
                    </>    
                )}
            </div>
        </div>
    );
};

export default SellerScreen;