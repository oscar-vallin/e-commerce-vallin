import React, { useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { useSelector, useDispatch } from 'react-redux';
import { createOrderAction } from '../actions/orderAction';
import { ORDER_CREATE_RESET } from '../constans/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';


const PlaceOrderScreen = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const cart = useSelector(({cart}) => cart);

    if(!cart.paymentMethod){
        history.push('/payment');
    };

    const orderCreate = useSelector(({orderCreate}) => orderCreate);
    const { loading, success, error, order } = orderCreate;
    const toPrice = num => Number(num.toFixed(2));
    cart.itemsPrice = toPrice(cart.cartItems.reduce((a,c) => a + c.qty * c.price, 0));
    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
    cart.taxPrice = toPrice(0.16 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
    
    const placeOlderHandler = () => {
        dispatch(createOrderAction({...cart, orderItems: cart.cartItems}))
    };
    useEffect(() => {
        if(success){
            history.push(`/order/${order._id}`);
            dispatch({type: ORDER_CREATE_RESET});
        }
    },[success, dispatch, order, history]);
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />      
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name: </strong> {cart.shippingAddress.fullName}<br/>
                                    <strong>Address: </strong> {cart.shippingAddress.address},
                                    {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},
                                    {cart.shippingAddress.country}
                                    
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Payment</h2>
                                <p>
                                    <strong>Payment: </strong> {cart.paymentMethod}
                                    
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Order Items</h2>
                                <ul>
                      {
                          cart.cartItems.map(cart => (
                              <li key={cart.product}>
                                  <div className="row">
                                      <div>
                                          <img 
                                            src={cart.image} 
                                            alt={cart.name} 
                                            className="small">                                                
                                          </img>
                                      </div>
                                      <div className="min-30">
                                          <Link to={`/product/${cart.product}`}>{cart.name}</Link>
                                      </div>
                                      <div>
                                          <div>{cart.qty} * ${cart.price} = ${cart.qty*cart.price}</div>
                                      </div>
                                  </div>
                              </li>
                          ))
                      }
                  </ul>  
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                      <div className="card card-body">
                          <ul>
                              <li>
                                  <h2>Order Sumary</h2>
                              </li>
                              <li>
                                  <div className="row">
                                      <div>Items</div>
                                      <div>${cart.itemsPrice.toFixed(2)}</div>
                                  </div>
                              </li>
                              <li>
                                  <div className="row">
                                      <div>Shipping Price</div>
                                      <div>${cart.shippingPrice}</div>
                                  </div>
                              </li>
                              <li>
                                  <div className="row">
                                      <div>Tax Price</div>
                                      <div>${cart.taxPrice.toFixed(2)}</div>
                                  </div>
                              </li>
                              <li>
                                  <div className="row">
                                      <div>Toral Price</div>
                                      <div>${cart.totalPrice.toFixed(2)}</div>
                                  </div>
                              </li>
                              <li>
                                  <button 
                                    className="primary block" 
                                    onClick={placeOlderHandler}  
                                    type="button"
                                    disabled={cart.cartItems.length === 0}
                                    >
                                     Place Older
                                  </button>
                              </li>
                              
                                 { loading && <LoadingBox />}
                                 { error && <MessageBox variant="danger">{error}</MessageBox>}
                              
                          </ul>
                      </div>
                </div>
            </div>
        </div>
    );
}

export default PlaceOrderScreen;