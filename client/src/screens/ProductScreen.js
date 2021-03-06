
import React from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProductsAction } from '../actions/productActions';

import Rating from '../components/Rating';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const ProductScreen = () => {
    
    const { id } = useParams();
    const history = useHistory();
    const [qty, setQty] = React.useState(1);
    const productDetails = useSelector(({productDetails}) => productDetails);
    const { loading, error, product } = productDetails;
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(detailsProductsAction(id));
    },[dispatch, id]);
 
    const addToCardHandler = e => {
        history.push(`/cart/${id}?qty=${qty}`);
    }
    if(!product) return null;

    return (
        <div>
            {loading ? (<LoadingBox />
            ): error ? ( <MessageBox variant='danger'>{error}</MessageBox>
            ):(
            <div>
                <div className="row top">
                    {/* <Link to="/">Back to result</Link> */}
                    <div className="col-2">
                        <img className="large" src={product.image} alt={product.name}/>
                    </div>
                    <div className="col-1">
                        <ul>
                            <li>
                                <h1>{product.name}</h1>
                            </li>
                            <li>
                                <Rating 
                                    rating={product.rating}
                                    numReviews={product.numReviews}
                                />
                            </li>
                            <li>
                                <p>Description:</p>
                                {product.description}
                            </li>
                        </ul>
                    </div>       
                    <div className="col-1">
                        <div className="card card-body">
                            <ul>
                                <li>
                                    seller{' '}
                                    <h2> 
                                        <Link to={`/seller/${product.seller._id}`}>
                                            {product.seller.seller.name}
                                        </Link>
                                    </h2>
                                    <Rating rating={product.seller.seller.rating} numReviews={product.seller.seller.numReviews}/>
                                </li>
                                <li>
                                    <div className="row">
                                        <div>Price</div>
                                        <div className="price">{product.price}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div>Status </div>
                                        <div className="price">
                                            {product.countInStock > 0 ? (
                                            <span className="success">In Stock</span>
                                            ):( 
                                            <span className="danger"> Unavailable</span>
                                            )}
                                        </div>
                                    </div>
                                </li>
                                { product.countInStock > 0 && (
                                    <>
                                    <li>
                                        <div className="row">
                                            <div>Qty</div>
                                            <div>
                                                <select value={qty} onChange={e => setQty(e.target.value)}>
                                                    {
                                                        [...Array(product.countInStock).keys()].map(x => (
                                                            <option key={x+1} value={x+1}>{x+1}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <button 
                                         className="primary block"
                                         onClick={addToCardHandler}
                                        >Add card
                                        </button>
                                    </li>
                                    </>
                                   
                                ) }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
};

export default ProductScreen;
