import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { addToCartAction, deleteCardAction } from '../actions/cartAction';
import MessageBox from '../components/MessageBox';

const CardScreen = (props) => {

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    const history = useHistory();
    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split('=')[1]): 1;
 
    useEffect(() => {
        if(productId){
            dispatch(addToCartAction(productId, qty));
        };
    },[dispatch, productId, qty]);

   const removeFromCartHandler = id => dispatch(deleteCardAction(id));
       
   const checkOutHandler = () => history.push('/signin?redirect=shipping');

    return (
        <div className="row top">
            <div className="col-2">
                <h1>shopping cart</h1>
                {cartItems.length === 0 ?
                    <MessageBox>Cart is empty.
                        <Link to="/">  Go Shopping</Link>
                    </MessageBox>    
                  :
                  <ul>
                      {
                          cartItems.map(cart => (
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
                                          <select 
                                            value={cart.qty} 
                                            onChange={e => 
                                            dispatch(addToCartAction(cart.product, Number(e.target.value)))}
                                            >
                                                {
                                                        [...Array(cart.countInStock).keys()].map(x => (
                                                            <option key={x+1} value={x+1}>{x+1}</option>
                                                        ))
                                                }
                                            </select>
                                      </div>
                                      <div>
                                          {cart.price}
                                      </div>
                                      <div>
                                          <button
                                            type="button"
                                            onClick={() => removeFromCartHandler(cart.product)}
                                          >
                                             Delete 
                                          </button>
                                      </div>
                                  </div>
                              </li>
                          ))
                      }
                  </ul>  
                }
            </div>
            <div className="col-1">
                <div className="card card-body">
                    <ul>
                        <li>
                            <h2>
                                SubTotal ({cartItems.reduce((a, c) => a+c.qty, 0)} cart):
                                 ${cartItems.reduce((a,c) => a+c.price*c.qty, 0)}
                            </h2>
                        </li>
                        <li>
                            <button 
                                type="button" 
                                className="primary block"
                                onClick={checkOutHandler} 
                                disabled={cartItems.length === 0}
                            >Proceed to Checkout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CardScreen;
