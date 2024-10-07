import { CANCEL_ORDER_FAILURE, CANCEL_ORDER_REQUEST, CANCEL_ORDER_SUCCESS, CONFIRM_ORDER_FAILURE, CONFIRM_ORDER_REQUEST, CONFIRM_ORDER_SUCCESS, DELETE_ORDER_FAILURE, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, DELIVER_ORDER_FAILURE, DELIVER_ORDER_REQUEST, DELIVER_ORDER_SUCCESS, GET_ORDERS_FAILURE, GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS, SHIP_ORDER_FAILURE, SHIP_ORDER_REQUEST, SHIP_ORDER_SUCCESS } from "./ActionType"
import { api } from "../../../Config/apiConfig"



// Redux action
export const getOrders = (page, limit) => async (dispatch) => {
    try {
        const response = await api.get(`/api/admin/order?page=${page}&limit=${limit}`);
        
        dispatch({ type: 'GET_ORDERS_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'GET_ORDERS_FAIL', payload: error.message });
    }
};


export const ConfirmOrder = (orderId) => async (dispatch) => {
    dispatch({ type: CONFIRM_ORDER_REQUEST })
    try {
        const { data } = await api.put(`/api/admin/order/${orderId}/confirmed`)
        dispatch({ type: CONFIRM_ORDER_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: CONFIRM_ORDER_FAILURE, payload: error.message })
    }
}

export const ShipOrder = (orderId) => async (dispatch) => {
    dispatch({ type: SHIP_ORDER_REQUEST })
    try {
        const { data } = await api.put(`/api/admin/order/${orderId}/shiporder`)
        dispatch({ type: SHIP_ORDER_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: SHIP_ORDER_FAILURE, payload: error.message })
    }
}


export const DeliverOrder = (orderId) => async (dispatch) => {
    dispatch({ type: DELIVER_ORDER_REQUEST })
    try {
        const { data } = await api.put(`/api/admin/order/${orderId}/deliverorder`)
        dispatch({ type: DELIVER_ORDER_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: DELIVER_ORDER_FAILURE, payload: error.message })
    }
}

export const CancelOrder = (orderId) => async (dispatch) => {
    dispatch({ type: CANCEL_ORDER_REQUEST })
    try {
        const { data } = await api.put(`/api/admin/order/${orderId}/cancelorder`)
        dispatch({ type: CANCEL_ORDER_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: CANCEL_ORDER_FAILURE, payload: error.message })
    }
}

export const deleteOrder = (orderId) => async (dispatch) => {
    dispatch({ type: DELETE_ORDER_REQUEST })
    try {
        const { data } = await api.put(`/api/admin/order/${orderId}/deleteorder`)
        dispatch({ type: DELETE_ORDER_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: DELETE_ORDER_FAILURE, payload: error.message })
    }
}