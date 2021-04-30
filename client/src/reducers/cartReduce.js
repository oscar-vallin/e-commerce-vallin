import { 
    CART_ADD_ITEM, 
    CART_DELETE_ITEM, 
    CART_SAVE_SHIPPING_ADDRESS, 
    CART_EMPTY,
    SAVE_PAYMENT_METHOD } from '../constans/cartConstants';


export function cartReducer(state = {cartItems : []}, action){
    switch(action.type){
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(x => x.product === item.product);
            if(existItem){
                return {
                    ...state,
                    error: '',
                    cartItems: state.cartItems.map(x => x.product === existItem.product ? item: x)
                }
            }else{
                return {...state, error: '', cartItems: [...state.cartItems, item]};
            }
        case CART_DELETE_ITEM:
            return {...state, error: '', cartItems: state.cartItems.filter(item => item.product !== action.payload)};    
        case CART_SAVE_SHIPPING_ADDRESS:
            return {...state, shippingAddress: action.payload};
        case SAVE_PAYMENT_METHOD:
            return {...state, paymentMethod: action.payload};   
        case CART_EMPTY:
            return {...state, error: '', cartItems: []};         
        default:
            return state;
    };
};