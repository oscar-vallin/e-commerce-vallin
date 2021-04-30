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
    PRODUCT_CREATE_RESET,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_ERROR,
    PRODUCT_UPDATE_RESET,
    PRODUCT_DELETE_ERROR,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_RESET,
    PRODUCT_CATEGORY_LIST_REQUEST,
    PRODUCT_CATEGORY_LIST_SUCCESS,
    PRODUCT_CATEGORY_LIST_ERROR } 
from '../constans/productConstants';  

const initialState = {
    products: [],
    loading: false,
    success: false,
    error: null,
    product: null
}

export function productsListreducer(state = initialState, action){
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return {loading: true};
        case PRODUCT_LIST_SUCCESS:
            return {loading: false, products: action.payload};    
        case PRODUCT_LIST_ERROR:
            return {loading: false, error: action.payload};           
    default:
        return state; 
    };  
};

export function productCategoryListreducer(state = {}, action){
    switch(action.type){
        case PRODUCT_CATEGORY_LIST_REQUEST:
            return {loading: true};
        case PRODUCT_CATEGORY_LIST_SUCCESS:
            return {loading: false, categories: action.payload};    
        case PRODUCT_CATEGORY_LIST_ERROR:
            return {loading: false, error: action.payload};           
    default:
        return state; 
    };  
};

export  function productDetailsReducer(state = initialState, action){
    switch(action.type){
        case PRODUCT_DETAILS_REQUEST:
            return {loading: true};
        case PRODUCT_DETAILS_SUCCESS:
            return {product: action.payload, loading: false}; 
        case PRODUCT_DETAILS_ERROR:
            return {loading: false, error: action.payload};    
        default:
            return state;
    };
};

export function productCreateReducer(state = initialState, action){
    switch(action.type){
        case PRODUCT_CREATE_REQUEST:
            return {loading: true};
        case PRODUCT_CREATE_SUCCESS:
            return {loading: false, product: action.payload, success: true};    
        case PRODUCT_CREATE_ERROR:
            return {loading: false, error: action.payload, success: false};    
        case PRODUCT_CREATE_RESET:
            return {};    
        default:
            return state;
    };
};

export function productUpdateReducer(state = initialState, action){
    switch(action.type){
        case PRODUCT_UPDATE_REQUEST:
            return {loading: true};
        case PRODUCT_UPDATE_SUCCESS:
            return{loading: false,  success: true};
        case PRODUCT_UPDATE_ERROR:
            return {loading: false, error: action.payload};
        case PRODUCT_UPDATE_RESET:
            return {};          
        default:
            return state;
    };
};

export function productDeleteReducer(state = initialState, action){
    switch(action.type){
        case PRODUCT_DELETE_REQUEST:
            return {loading: true};
        case PRODUCT_DELETE_SUCCESS:
            return {loading: false, success: true, message: action.payload};
        case PRODUCT_DELETE_ERROR:
            return {loading: false, error: action.payload};
        case PRODUCT_DELETE_RESET:
            return {};        
        default:
            return state;
    };
};