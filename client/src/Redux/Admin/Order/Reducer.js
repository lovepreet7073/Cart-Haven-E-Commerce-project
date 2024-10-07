import { PLACE_ORDER_REQUEST, CONFIRM_ORDER_REQUEST, DELIVER_ORDER_REQUEST, GET_ORDERS_FAILURE, GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS, CANCEL_ORDER_REQUEST, CONFIRM_ORDER_SUCCESS, PLACE_ORDER_SUCCESS, DELIVER_ORDER_SUCCESS, CANCEL_ORDER_SUCCESS, CONFIRM_ORDER_FAILURE, CANCEL_ORDER_FAILURE, DELIVER_ORDER_FAILURE, PLACE_ORDER_FAILURE, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, DELETE_ORDER_FAILURE, SHIP_ORDER_REQUEST, SHIP_ORDER_FAILURE, SHIP_ORDER_SUCCESS } from "./ActionType"

const initialState = {
    orders: [],
    isLoading: false,
    error: null,

}

export const adminOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDERS_REQUEST:
            return { ...state, isLoading: true, error: null }
        case GET_ORDERS_SUCCESS:
            return {
                ...state, isLoading: false,
                orders: action.payload,
                error: null
            }
        case GET_ORDERS_FAILURE:
            return { ...state, isLoading: false, error: action.payload }
        case CONFIRM_ORDER_REQUEST:
        case PLACE_ORDER_REQUEST:
        case DELIVER_ORDER_REQUEST:
        case CANCEL_ORDER_REQUEST:
            return {
                ...state, isLoading: true, error: null
            }
        case CONFIRM_ORDER_SUCCESS:
            return {
                ...state,
                confirmed: action.payload,
                isLoading: false
            }
        case PLACE_ORDER_SUCCESS: 
            return {
                ...state,
                placed: action.payload,
                isLoading: false
            }
        case DELIVER_ORDER_SUCCESS:
            return {
                ...state,
                delivered: action.payload,
                isLoading: false
            }
        case CANCEL_ORDER_SUCCESS:
            return {
                ...state,
                canceled: action.payload,
                isLoading: false
            }
        case CONFIRM_ORDER_FAILURE:
        case CANCEL_ORDER_FAILURE:
        case DELIVER_ORDER_FAILURE:
        case PLACE_ORDER_FAILURE:
        case DELETE_ORDER_FAILURE:
        case SHIP_ORDER_FAILURE:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            }

        case DELETE_ORDER_REQUEST:
        case SHIP_ORDER_REQUEST:
            return { ...state, isLoading: true, error: null }
        case DELETE_ORDER_SUCCESS:
            return {
                ...state,
                deleted: action.payload,
                isLoading: false
            }
        case SHIP_ORDER_SUCCESS:
            return {
                ...state,
                shipped: action.payload,
                isLoading: false
            }

        default:
            return state;
    }
}