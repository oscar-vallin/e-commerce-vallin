import React, { useEffect, useState } from 'react'
import {  Link, useHistory } from 'react-router-dom';
import {PayPalButton} from 'react-paypal-button-v2';
import { useDispatch, useSelector } from 'react-redux';
import { detailsOrderAction, payOrderAction, deliverOrderAction} from '../actions/orderAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import axios from 'axios';
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../constans/orderConstants';


const OrderScreen = (props) => {
    
    const dispatch = useDispatch();

    const orderId = props.match.params.id;
    const history = useHistory();
    const [sdkReady, setSdkReady] = useState(false);

    const orderDetails = useSelector(state => state.orderDetails);
    const orderPay = useSelector(state => state.orderPay);
    const orderDeliver = useSelector(state => state.orderPay);
    const userSignin = useSelector(state => state.userSignin);

    const {  loading, order, error} = orderDetails;
    const { error: errorPay, success: successPay, loading: loadingPay } = orderPay;
    const {  success: successDeliver } = orderDeliver;
    const { user } = userSignin;
    

    
    useEffect(() => {
        const addPayPalScript = async() => {
            const { data } = await axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type="text/javascript";
            script.src=`https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async=true;
            script.onload=() => {
                setSdkReady(true);
            }
            document.body.appendChild(script)
        };

        if(order === undefined|| successPay || successDeliver || (order && order._id !== orderId)){
            dispatch({type: ORDER_PAY_RESET});
            dispatch({type: ORDER_DELIVER_RESET});
            dispatch(detailsOrderAction(orderId))
        } else {
            if(!order.isPaid){
                if(!window.paypal){
                    addPayPalScript();
                }else{
                    setSdkReady(true);
                };
            };
        };
    },[dispatch, order, orderId, sdkReady, successPay, successDeliver,history,user]);

    const successPaymentHanlder = paymentResults => {
        dispatch(payOrderAction(order, paymentResults));
    };

    const deliverHanlder = () => {
        dispatch(deliverOrderAction(order._id));
    }
    // if(order === undefined) return null;
    return loading ? (
        <LoadingBox />
    ):error ? (
    <MessageBox variant="danger">{error}</MessageBox>
    ): (
    
        <div> 
            <h1>Order {order._id }</h1>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name: </strong> {order.shippingAddress.fullName}<br/>
                                    <strong>Address: </strong> {order.shippingAddress.address},
                                    {order.shippingAddress.city}, {order.shippingAddress.postalCode},
                                    {order.shippingAddress.country}
                                    
                                </p>
                                {order.isDeliver? <MessageBox variant="success">Delivered at {order.deliveredAt}</MessageBox>
                                :
                                <MessageBox variant="danger">Not delivered </MessageBox>    
                                }
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Payment</h2>
                                <p>
                                    <strong>Payment: </strong> {order.paymentMethod}
                                    
                                </p>
                                {order.isPaid? <MessageBox variant="success">Paid at {order.paidAt}</MessageBox>
                                :
                                <MessageBox variant="danger">Not Paid </MessageBox>    
                                }
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Order Items</h2>
                                <ul>
                      {
                          order.orderItems.map(order => (
                              <li key={order.product}>
                                  <div className="row">
                                      <div>
                                          <img 
                                            src={order.image} 
                                            alt={order.name} 
                                            className="small">                                                
                                          </img>
                                      </div>
                                      <div className="min-30">
                                          <Link to={`/product/${order.product}`}>{order.name}</Link>
                                      </div>
                                      <div>
                                          <div>{order.qty} * ${order.price} = ${order.qty*order.price}</div>
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
                                      <div>${order.itemsPrice.toFixed(2)}</div>
                                  </div>
                              </li>
                              <li>
                                  <div className="row">
                                      <div>Shipping Price</div>
                                      <div>${order.shippingPrice}</div>
                                  </div>
                              </li>
                              <li>
                                  <div className="row">
                                      <div>Tax Price</div>
                                      <div>${order.taxPrice.toFixed(2)}</div>
                                  </div>
                              </li>
                              <li>
                                  <div className="row">
                                      <div>Toral Price</div>
                                      <div>${order.totalPrice.toFixed(2)}</div>
                                  </div>
                              </li>
                              {
                                !order.isPaid && (
                                    <li>
                                        {!sdkReady? (<LoadingBox />):
                                        (
                                            <>
                                            {errorPay && <MessageBox variant="danger"></MessageBox>}
                                            {loadingPay && <LoadingBox/>}
                                            <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHanlder}>

                                            </PayPalButton>
                                            </>
                                        )};
                                    </li>
                                )};
                                {user.isAdmin && order.isPaid && !order.isDelivered && (
                                    <li>
                                        <button 
                                            type="button" 
                                            onClick={deliverHanlder}
                                            className="primary block"    
                                        >Deliver Order</button>
                                    </li>
                                )}
                          </ul>
                      </div>
                </div>
            </div>
        </div>
    );
}

export default OrderScreen;
