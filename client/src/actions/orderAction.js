import { 
        ORDER_CREATE_ERROR, 
        ORDER_CREATE_REQUEST, 
        ORDER_CREATE_SUCCESS,
        ORDER_DETAILS_REQUEST,
        ORDER_DETAILS_SUCCESS,
        ORDER_DETAILS_ERROR,
        ORDER_PAY_REQUEST,
        ORDER_PAY_ERROR,
        ORDER_PAY_SUCCESS, 
        ORDER_DELIVER_REQUEST,
        ORDER_DELIVER_ERROR,
        ORDER_DELIVER_SUCCESS, 
        ORDER_MINE_LIST_REQUEST,
        ORDER_MINE_LIST_ERROR,
        ORDER_MINE_LIST_SUCCESS,
        ORDER_USER_LIST_REQUEST,
        ORDER_USER_LIST_SUCCESS,
        ORDER_USER_LIST_ERROR,
        ORDER_DELETE_REQUEST,
        ORDER_DELETE_SUCCESS,
        ORDER_DELETE_ERROR} from '../constans/orderConstants';
import axios from 'axios';
import { CART_EMPTY } from '../constans/cartConstants';

export const createOrderAction = order => async (dispatch, getState) => {
    dispatch({type: ORDER_CREATE_REQUEST, payload: order});

    try {
        const { user } = getState().userSignin;
        const { data } = await axios.post('/api/orders', order, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        });
        dispatch({type: ORDER_CREATE_SUCCESS, payload: data.order});
        dispatch({type:CART_EMPTY});
        localStorage.removeItem('cartsItems')
    } catch (error) {
        console.log(error.message);
        dispatch({
            type: ORDER_CREATE_ERROR,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        });
    };
};
export const detailsOrderAction = orderId => async (dispatch, getState) => {
    
    dispatch({type: ORDER_DETAILS_REQUEST, payload: orderId});

    try {
        const { user } = getState().userSignin
        const { data } = await axios.get(`/api/orders/${orderId}`,{
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        });
        dispatch({type: ORDER_DETAILS_SUCCESS, payload: data});
    } catch (error) {
        console.log(error.message);
        const message =  error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

        dispatch({ type: ORDER_DETAILS_ERROR, payload: message})
    };
};

export const payOrderAction = (order, paymentResults) => async(dispatch, getState) => {
    dispatch({type: ORDER_PAY_REQUEST, payload: {order, paymentResults}});
    const { user } = getState().userSignin;
    try {
        const { data } = axios.put(`api/orders/${order._id}/pay`, paymentResults, {
            headers: {Authorization: `Bearer ${user._id}`}
        });
        dispatch({type: ORDER_PAY_SUCCESS, payload: data});
    } catch (error) {
        console.log(error.message);
        const message =  error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

        dispatch({ type: ORDER_PAY_ERROR, payload: message})
    }
};

export const listOrderMineAction = () => async(dispatch, getState) => {
    dispatch({type: ORDER_MINE_LIST_REQUEST});
    const { user } = getState().userSignin;
    try {
        const { data } = await axios.get('/api/orders/mine', {
            headers: {Authorization: `Bearer ${user.token}`}
        });
        dispatch({type: ORDER_MINE_LIST_SUCCESS, payload: data});
    } catch (error) {
        console.log(error.message);
        const message =  error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
        dispatch({
            type: ORDER_MINE_LIST_ERROR,
            payload: message
        })
    };
};

export const getOrdersUsersAction = ({seller = ''}) => async (dispatch, getState) => {
    dispatch({type: ORDER_USER_LIST_REQUEST});
    const { user } = getState().userSignin;
    console.log(seller)
    try {
        const { data } = await axios.get(`/api/orders?seller${seller}`, {
            headers: {Authorization: `Bearer ${user.token}`}
        });
        dispatch({type: ORDER_USER_LIST_SUCCESS, payload: data});
    } catch (error) {
        console.log(error.message);
        const message =  error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
        dispatch({
            type: ORDER_USER_LIST_ERROR,
            payload: message
        });
    };
};

export const deleteOrderAction = orderId => async (dispatch, getState) => {
    dispatch({type: ORDER_DELETE_REQUEST});
    const { user } = getState().userSignin;

    try {
        const { data } = await axios.delete(`/api/orders/${orderId}`, {
            headers: {Authorization: `Bearer ${user.token}`}
        });
        dispatch({type: ORDER_DELETE_SUCCESS, payload: data.message});
    } catch (error) {
        console.log(error.message);
        const message =  error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
        dispatch({
            type: ORDER_DELETE_ERROR,
            payload: message
        });
    };
};

export const deliverOrderAction = orderId => async(dispatch, getState) => {
    dispatch({type: ORDER_DELIVER_REQUEST});
    const { user } = getState().userSignin;

    try {
        const { data } = axios.put(`api/orders/${orderId}/deliver`, {
            headers: {Authorization: `Bearer ${user._id}`}
        });
        dispatch({type: ORDER_DELIVER_SUCCESS, payload: data});
    } catch (error) {
        console.log(error.message);
        const message =  error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

        dispatch({ type: ORDER_DELIVER_ERROR, payload: message})
    }
};