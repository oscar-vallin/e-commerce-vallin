import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { savePaymentMethod } from '../actions/cartAction';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentMethodScreen = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const cart = useSelector(({cart}) => cart);
    const { shippingAddress } = cart;
    if(!shippingAddress.address){
        history.push('/shipping');
    };
    const [paymentMethod, setPaymentMethod] = useState('paypal');
    const submitHandler = e => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push('/placeolder')
    };
 
    return (
        <div>
            <CheckoutSteps step1 step2 step3 />
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Payment Method</h1>
                </div>
                <div>
                    <div>
                        <input 
                            type="radio" 
                            id="paypal" 
                            value="paypal" 
                            name="paymentMethod" 
                            required 
                            checked 
                            onChange={e => setPaymentMethod(e.target.value)}/>
                        <label htmlFor="paypal">Paypal</label>    
                    </div>
                </div>
                <div>
                    <div>
                        <input 
                            type="radio" 
                            id="stripe" 
                            value="Stripe" 
                            name="paymentMethod" 
                            required 
                            onChange={e => setPaymentMethod(e.target.value)}/>
                        <label htmlFor="stripe">Stripe</label>    
                    </div>
                </div>
                <div>
                    <button 
                        className="primary"
                        type="submit">Continue</button>
                </div>
            </form>
        </div>
    )
}
 export default PaymentMethodScreen;