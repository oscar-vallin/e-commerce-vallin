import {createStore, compose, applyMiddleware, combineReducers,} from 'redux';
import thunk from 'redux-thunk';


import { 
        productsListreducer, 
        productDetailsReducer, 
        productCreateReducer, 
        productUpdateReducer, 
        productDeleteReducer,
        productCategoryListreducer} 
from './reducers/productReducer';

import { cartReducer } from './reducers/cartReduce';

import { 
        userSigninReducer, 
        userRegisterReducer, 
        userDetailsReducer, 
        userProfileUpdateReducer,
        userListReducer,
        userDeleteReducer,
        userUpdateReducer,
        } 
from './reducers/userReducer';

import { 
        orderCreateReducer, 
        orderDetailsReducer, 
        orderPayReducer, 
        orderMineListReducer, 
        orderUsersListReducer, 
        orderDeleteReducer,
        orderDeliverReducer} 
from './reducers/orderReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const initialState = {
    userSignin: {
        user: 
            localStorage.getItem('user')?
            JSON.parse(localStorage.getItem('user')):
            null
    },
    cart: {
        cartItems: 
            localStorage.getItem('cartItems') ? 
            JSON.parse(localStorage.getItem('cartItems')) :
            [],
            shippingAddress: localStorage.getItem('shippingAddress')
                ? JSON.parse(localStorage.getItem('shippingAddress'))
                : {},
            paymentMethod: 'paypal'    
    }
};
const reducers = combineReducers({
    productList: productsListreducer,
    productDetails: productDetailsReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    productCategory: productCategoryListreducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userProfileUpdateReducer,
    userList:userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMineList: orderMineListReducer,
    orderUsersList: orderUsersListReducer,
    orderDelete: orderDeleteReducer,
    orderDeliver: orderDeliverReducer
});

const store = createStore(reducers, initialState, composeEnhancers(applyMiddleware(thunk)));

export default store;