import axios from 'axios';
import { CART_EMPTY } from '../constans/cartConstants';


import { 
    SIGNIN_USER_REQUEST, 
    SIGNIN_USER_ERROR, 
    SIGNIN_USER_SUCCESS, 
    USER_SIGNOUT,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    DETAILS_USER_REQUEST,
    DETAILS_USER_SUCCESS,
    DETAILS_USER_ERROR,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_ERROR,
    USER_UPDATE_PROFILE_SUCCESS,
    LIST_USER_REQUEST,
    LIST_USER_SUCCESS,
    LIST_USER_ERROR,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_ERROR,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_ERROR,}
    from "../constans/userConstans";
    

export const signinAction = dataUser => async dispatch => {
    dispatch({type: SIGNIN_USER_REQUEST});
    try {
        const { data } = await axios.post('/api/users/signin', dataUser);
        dispatch({type: SIGNIN_USER_SUCCESS, payload: data});
        localStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
        console.log(error.message);
        dispatch({
            type: SIGNIN_USER_ERROR, 
            payload: 
            error.response && error.response.data.message ?
            error.response.data.message: error.message
        });
    };
};
export const registerAction = dataUser => async dispatch => {
 
    dispatch({type: REGISTER_USER_REQUEST});
    try {
        const { data } = await axios.post('/api/users/register', dataUser);
  
        dispatch({type: REGISTER_USER_SUCCESS, payload: data});
    } catch (error) {
        console.log(error.message);
        dispatch({
            type: REGISTER_USER_ERROR, 
            payload: 
            error.response && error.response.data.message ?
            error.response.data.message: error.message
        });
    };
};


export const signoutAction = () => async dispatch => {
    localStorage.removeItem('user');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    dispatch({type: CART_EMPTY});
    dispatch({type: USER_SIGNOUT});
    
};

export const detailsUserAction = userId => async (dispatch, getState) => {
    dispatch({type: DETAILS_USER_REQUEST, payload: userId});
    const { user } = getState().userSignin;

    try {
        const { data } = await axios.get(`/api/users/${userId}`,{
            headers: {Authorization: `Bearer ${user.token}`}
        });
        dispatch({type: DETAILS_USER_SUCCESS, payload: data});
    } catch (error) {
        console.log(error.message);
        dispatch({
            type: DETAILS_USER_ERROR,
            payload:
            error.response && error.response.data.message ?
            error.response.data.message: error.message
        });
    };
};

export const updateUserProfileAction = userUpdate => async(dispatch, getState) => {
    dispatch({type: USER_UPDATE_PROFILE_REQUEST, payload: userUpdate});
    const { user } = getState().userSignin;
    console.log(userUpdate.data);
    try {
        const { data } = await axios.put(`/api/users/profile`, userUpdate.data, {
            headers: {Authorization: `Bearer ${user.token}`}
        });
        dispatch({type: USER_UPDATE_PROFILE_SUCCESS, payload:data});
        localStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
        console.log(error.message);
        dispatch({
            type: USER_UPDATE_PROFILE_ERROR,
            payload:
            error.response && error.response.data.message ?
            error.response.data.message: error.message
        });
    };
};

export const getUsersAction = () => async (dispatch, getState) => {
    dispatch({type: LIST_USER_REQUEST});
    const { user } = getState().userSignin;

    try {
        const { data } = await axios.get('/api/users', {
            headers: {Authorization: `Bearer ${user.token}`}
        });
        dispatch({type: LIST_USER_SUCCESS, payload: data});
    } catch (error) {
        console.log(error.message);
        dispatch({
            type: LIST_USER_ERROR,
            payload:
            error.response && error.response.data.message ?
            error.response.data.message: error.message
        });
    };
};

export const deleteUserAction = userId => async (dispatch, getState) => {
    dispatch({type: DELETE_USER_REQUEST});
    const { user } = getState().userSignin;

    try {
        const { data } = await axios.delete(`/api/users/${userId}`, {
            headers: {Authorization: `Bearer ${user.token}`}
        });
        dispatch({type: DELETE_USER_SUCCESS, payload: data.message});
    } catch (error) {
        console.log(error.message);
        dispatch({
            type: DELETE_USER_ERROR,
            payload:
            error.response && error.response.data.message ?
            error.response.data.message: error.message
        });
    };
};

export const updateUser = userData => async (dispatch, getState) => {
    dispatch({type: USER_UPDATE_REQUEST});
    const  { user } = getState().userSignin;

    try {
        const { data } = await axios.put(`/api/users/${userData._id}`, userData.data, {
            headers: {Authorization: `Bearer ${user.token}`}
        });
        dispatch({type: USER_UPDATE_SUCCESS, payload: data});
    } catch (error) {
        console.log(error.message);
        dispatch({
            type: USER_UPDATE_ERROR,
            payload:
            error.response && error.response.data.message ?
            error.response.data.message: error.message
        });
    };
};

// export const topSellerAction = () => async (dispatch,) => {
//     dispatch({type: LIST_TOPSELLER_USER_REQUEST});

//     try {
//         const { data } = await axios.get('/api/users/top-seller');

//         dispatch({type: LIST_TOPSELLER_USER_SUCCESS, payload: data});
//     } catch (error) {
//         console.log(error.message);
//         dispatch({
//             type: LIST_TOPSELLER_USER_ERROR,
//             payload:
//             error.response && error.response.data.message ?
//             error.response.data.message: error.message
//         });
//     };
// };

