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
    DETAILS_USER_RESET,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_ERROR,
    USER_UPDATE_PROFILE_RESET,
    LIST_USER_REQUEST,
    LIST_USER_SUCCESS,
    LIST_USER_ERROR,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_ERROR,
    DELETE_USER_RESET,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_ERROR,
    USER_UPDATE_REQUEST,
    USER_UPDATE_RESET,
    CONFIRM_USER_REGISTER_REQUEST,
    CONFIRM_USER_REGISTER_SUCCESS,
    CONFIRM_USER_REGISTER_ERROR    } from "../constans/userConstans";

const initialState = {
    user: null,
    loading: false,
    error: null,
    message: null,
}
export  function userSigninReducer(state = initialState, action){
    switch(action.type){
        case SIGNIN_USER_REQUEST:
            return {loading: true}
        case SIGNIN_USER_SUCCESS:
            return {loading: false, user: action.payload, message: null}    
        case SIGNIN_USER_ERROR:
            return {loading: false, error: action.payload} 
        case USER_SIGNOUT:
            return {user: null}       
        default:
            return state;
    }
};

export function userRegisterReducer(state = initialState, action){
    switch(action.type){
        case REGISTER_USER_REQUEST:
            return {loading: true}
        case REGISTER_USER_SUCCESS:
            return {loading: false, message: action.payload}    
        case REGISTER_USER_ERROR:
            return {loading: false, error: action.payload} 
        default:
            return state;
    };
};

export function confirmEmailUserReducer(state = initialState, action){
    switch(action.type){
        case CONFIRM_USER_REGISTER_REQUEST:
            return {loading: true};
        case CONFIRM_USER_REGISTER_SUCCESS:
            return {loading: false, user:action.payload};
        case CONFIRM_USER_REGISTER_ERROR:
            return {loading:false, error: action.payload}        
        default:
            return state;
    }
}

export function userDetailsReducer(state = {loading: true}, action){
    switch(action.type){
        case DETAILS_USER_REQUEST:
            return {loading: true};
        case DETAILS_USER_SUCCESS:
            return {loading: false, user: action.payload};
        case DETAILS_USER_ERROR:
            return {loading: false, error: action.payload};
        case DETAILS_USER_RESET:
            return {};            
        default:
            return state;
    };
};

export const userProfileUpdateReducer = (state = {loading:true}, action) => {
    switch(action.type){
        case USER_UPDATE_PROFILE_REQUEST:
            return {loading: true}
        case USER_UPDATE_PROFILE_SUCCESS:
            return {loading: false, success: true};
        case USER_UPDATE_PROFILE_ERROR:
            return {loading: false, error: action.payload};
        case USER_UPDATE_PROFILE_RESET:
            return {};    
        default:
            return state;
    };
};

export const userListReducer = (state = {users: []}, action) => {
    switch(action.type){
        case LIST_USER_REQUEST:
            return {loading: true};
        case LIST_USER_SUCCESS:
            return {loading: false, users: action.payload};
        case LIST_USER_ERROR:
            return {loading: false, error: action.payload}       
        default:
            return state;
    };
};

export const userDeleteReducer = (state = {}, action) => {
    switch(action.type){
        case DELETE_USER_REQUEST:
            return {loading: true};
        case DELETE_USER_SUCCESS:
            return {loading: false, success: true};
        case DELETE_USER_ERROR:
            return {loading: false, error: action.payload};
        case DELETE_USER_RESET:
            return {};            
        default:
            return state;
    };
};

export const userUpdateReducer = (state = {loading:false}, action) => {
    switch(action.type){
        case USER_UPDATE_REQUEST:
            return {loading: true}
        case USER_UPDATE_SUCCESS:
            return {loading: false, success: true};
        case USER_UPDATE_ERROR:
            return {loading: false, error: action.payload};
        case USER_UPDATE_RESET:
            return {};    
        default:
            return state;
    };
};


// export const userTopSellerListReducer = (state = {users: [], loading:true}, action) => {
//     switch(action.type){
//         case LIST_TOPSELLER_USER_REQUEST:
//             return {loading: true};
//         case LIST_TOPSELLER_USER_SUCCESS:
//             return {loading: false, users: action.payload};
//         case LIST_TOPSELLER_USER_ERROR:
//             return {loading: false, error: action.payload}       
//         default:
//             return state;
//     };
// };