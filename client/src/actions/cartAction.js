import axios from "axios"
import { 
        CART_ADD_ITEM, 
        CART_DELETE_ITEM, 
        CART_SAVE_SHIPPING_ADDRESS, 
        SAVE_PAYMENT_METHOD } from '../constans/cartConstants';

export const addToCartAction = (productId, qty) => async (dispatch, getState) => {

    try {
        const { data } = await axios.get(`/api/products/${productId}`);
        dispatch({
            type:CART_ADD_ITEM, 
            payload:{
                name: data.name, 
                image: data.image, 
                price: data.price,
                countInStock: data.countInStock,
                product: data._id,
                seller: data.seller,
                qty,
             } 
        });
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    } catch (error) {
        
    };
};

export const deleteCardAction = productId => (dispatch, getState) => {
    dispatch({type: CART_DELETE_ITEM, payload: productId});
    localStorage.removeItem('cartItems', JSON.stringify(getState().cart.cartItems))
};

export const saveShippingAddress = data => dispatch => {
    dispatch({type: CART_SAVE_SHIPPING_ADDRESS, payload: data});
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = data => dispatch => {
    dispatch({type: SAVE_PAYMENT_METHOD, payload: data});
}