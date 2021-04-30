import axios from 'axios';
import { 
        PRODUCT_LIST_REQUEST, 
        PRODUCT_LIST_SUCCESS, 
        PRODUCT_LIST_ERROR,
        PRODUCT_DETAILS_REQUEST,
        PRODUCT_DETAILS_SUCCESS,
        PRODUCT_DETAILS_ERROR,
        PRODUCT_CREATE_REQUEST,
        PRODUCT_CREATE_SUCCESS,
        PRODUCT_CREATE_ERROR,
        PRODUCT_UPDATE_REQUEST,
        PRODUCT_UPDATE_SUCCESS,
        PRODUCT_UPDATE_ERROR,
        PRODUCT_DELETE_ERROR,
        PRODUCT_DELETE_SUCCESS,
        PRODUCT_DELETE_REQUEST,
        PRODUCT_CATEGORY_LIST_REQUEST,
        PRODUCT_CATEGORY_LIST_SUCCESS,
        PRODUCT_CATEGORY_LIST_ERROR } 
from '../constans/productConstants';  

export const listProductsAction = ({order = '',seller = '', name= '', category = '', min = 0, max = 0, rating = 0}) => async dispatch => {
    dispatch({type: PRODUCT_LIST_REQUEST});
    try {
        const { data } = await axios.get(`/api/products?seller=${seller}&name=${name}&category=${category}&min=${min}&max=${max}&rating=${rating}&order=${order}`);
    
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
    } catch (error) {
        console.log(error.message);
        dispatch({type: PRODUCT_LIST_ERROR, payload: error.message});
    }
};

export const listProductsCategoryAction = () => async (dispatch) => {
    dispatch({type: PRODUCT_CATEGORY_LIST_REQUEST});
    try {
        const { data } = await axios.get(`/api/products/categories`);
        dispatch({type: PRODUCT_CATEGORY_LIST_SUCCESS, payload: data});
    } catch (error) {
        console.log(error.message);
        dispatch({type: PRODUCT_CATEGORY_LIST_ERROR, payload: error.message});
    }
};

export const detailsProductsAction = productId => async dispatch => {
    dispatch({type: PRODUCT_DETAILS_REQUEST});
    try {

        const { data } = await axios.get(`/api/products/${productId}`);
        console.log(data)
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data});
    } catch (error) {
        console.log(error.message);
        dispatch({
            type: PRODUCT_DETAILS_ERROR, 
            payload: 
                error.response && error.response.data.message ?
                error.response.data.message: error.message
            });
    };
};

export const createProductAction = product => async (dispatch, getState) => {
    dispatch({type: PRODUCT_CREATE_REQUEST});
    const { user } = getState().userSignin;
    
    try {
        const { data } = await axios.post('/api/products',product,{
            headers: {Authorization: `Bearer ${user.token}`}
        });
        dispatch({type: PRODUCT_CREATE_SUCCESS, payload: data.product});
    } catch (error) {
        console.log(error.message);
        dispatch({
            type: PRODUCT_CREATE_ERROR,
            payload: 
                error.response && error.response.data.message ?
                error.response.data.message: error.message
        });
    };
};

export const updateProductAction = product => async (dispatch, getState) => {
    dispatch({type: PRODUCT_UPDATE_REQUEST});
    const { user } = getState().userSignin;
    
    try {
        const { data } = await axios.put(`/api/products/${product._id}/edit`, product.state, {
            headers: {Authorization: `Bearer ${user.token}`}
        });
        console.log(data)
        dispatch({type: PRODUCT_UPDATE_SUCCESS, payload: data.product});
    } catch (error) {
        console.log(error.message);
        dispatch({
            type: PRODUCT_UPDATE_ERROR,
            payload: 
                error.response && error.response.data.message ?
                error.response.data.message: error.message
        });
    };
};

export const deleteProductAction = id => async(dispatch, getState) => {
    dispatch({type: PRODUCT_DELETE_REQUEST});
    const { user } = getState().userSignin;

    try {
        const { data } = await axios.delete(`/api/products/${id}`, {
            headers: {Authorization: `Bearer ${user.token}`}
        });
        dispatch({type: PRODUCT_DELETE_SUCCESS, payload: data.message});
    } catch (error) {
        console.log(error.message)
        dispatch({
            type: PRODUCT_DELETE_ERROR,
            payload: 
                error.response && error.response.data.message ?
                error.response.data.message: error.message
        });
    }
}