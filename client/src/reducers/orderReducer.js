import { 
    ORDER_CREATE_ERROR, 
    ORDER_CREATE_REQUEST, 
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_RESET,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_ERROR,
    ORDER_PAY_REQUEST,
    ORDER_PAY_ERROR,
    ORDER_PAY_SUCCESS, 
    ORDER_PAY_RESET,
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
    ORDER_DELETE_ERROR,
    ORDER_DELETE_RESET,
    ORDER_DELIVER_RESET} from '../constans/orderConstants';


export function orderCreateReducer(state = {}, action){
    switch(action.type){
        case ORDER_CREATE_REQUEST:
            return {loading: true};
        case ORDER_CREATE_SUCCESS:
            return {loading: false, success: true, order: action.payload};
        case ORDER_CREATE_ERROR:
            return {loading: false, error: action.payload, success: false};    
        case ORDER_CREATE_RESET:
            return {};          
        default:
            return state;
    };
};
export function orderDetailsReducer(state = {loading:true}, action){
    switch(action.type){
        case ORDER_DETAILS_REQUEST:
            return {loading: true};
        case ORDER_DETAILS_SUCCESS:
            return {loading: false, order: action.payload};
        case ORDER_DETAILS_ERROR:
            return {loading: false, error: action.payload};        
        default:
            return state;
    }
};

export function orderPayReducer(state = {}, action){
    switch(action.type){
        case ORDER_PAY_REQUEST:
            return {loading: true};
        case ORDER_PAY_SUCCESS:
            return {loading: false, success: action.payload};
        case ORDER_PAY_ERROR:
            return {payload: false, error: action.payload};        
        case ORDER_PAY_RESET:
            return {};    
        default:
            return state;
    }
};

export function orderMineListReducer(state = { orders: [] }, action){
    switch(action.type){
        case ORDER_MINE_LIST_REQUEST:
            return {loading: true};
        case ORDER_MINE_LIST_SUCCESS:
            return {loading: false, orders: action.payload};
        case ORDER_MINE_LIST_ERROR:
            return {loading: false, error: action.payload};
        default:
            return state;            
    }
};

export function orderUsersListReducer(state = { orders: [] }, action){
    switch(action.type){
        case ORDER_USER_LIST_REQUEST:
            return {loading: true};
        case ORDER_USER_LIST_SUCCESS:
            return {loading: false, orders: action.payload};
        case ORDER_USER_LIST_ERROR:
            return {loading: false, error: action.payload};
        default:
            return state;            
    };
};


export function orderDeleteReducer(state= {}, action){
    switch(action.type){
        case ORDER_DELETE_REQUEST:
            return {loading: true};
        case ORDER_DELETE_SUCCESS:
            return {loading: false, messageSuccess: action.payload, success: true};
        case ORDER_DELETE_ERROR:
            return {loading: false, error: action.payload, success: false};
        case ORDER_DELETE_RESET:
            return {};    
        default:
            return state;            
    };
};

export function orderDeliverReducer(state = {}, action){
    switch(action.type){
        case ORDER_DELIVER_REQUEST:
            return {loading: true};
        case ORDER_DELIVER_SUCCESS:
            return {loading: false, success: action.payload};
        case ORDER_DELIVER_ERROR:
            return {payload: false, error: action.payload};        
        case ORDER_DELIVER_RESET:
            return {};    
        default:
            return state;
    }
};