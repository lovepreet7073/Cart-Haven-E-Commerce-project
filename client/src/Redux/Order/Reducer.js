import { 
    CREATE_ORDER_FAILURE, 
    CREATE_ORDER_REQUEST, 
    CREATE_ORDER_SUCCESS, 
    GET_ORDER_BY_ID_REQUEST, 
    GET_ORDER_BY_ID_FAILURE, 
    GET_ORDER_BY_ID_SUCCESS,
    GET_ORDERS_BY_USER_ID_REQUEST,
    GET_ORDERS_BY_USER_ID_SUCCESS,
    GET_ORDERS_BY_USER_ID_FAILURE 
} from "./ActionType";

const initialState = {
    orders: [], // To store all orders
    order: null, // To store a single order
    loading: false,
    error: null
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
        case GET_ORDER_BY_ID_REQUEST:
        case GET_ORDERS_BY_USER_ID_REQUEST: // Added case for request
            return { ...state, loading: true, error: null };

        case CREATE_ORDER_SUCCESS:
            return {
                ...state, loading: false,
                order: action.payload,
            };
        case CREATE_ORDER_FAILURE:
        case GET_ORDER_BY_ID_FAILURE:
        case GET_ORDERS_BY_USER_ID_FAILURE: // Added case for failure
            return { ...state, loading: false, error: action.payload };

        case GET_ORDER_BY_ID_SUCCESS:
            return {
                ...state, loading: false, error: null, order: action.payload
            };

        case GET_ORDERS_BY_USER_ID_SUCCESS: // Added case for success
            return {
                ...state, loading: false, error: null, orders: action.payload // Store fetched orders in the state
            };

        default:
            return state;
    }
};
