
import { api } from "../../Config/apiConfig"
import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_ORDER_BY_ID_FAILURE, GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_SUCCESS,GET_ORDERS_BY_USER_ID_REQUEST,
    GET_ORDERS_BY_USER_ID_SUCCESS,
    GET_ORDERS_BY_USER_ID_FAILURE } from "./ActionType"
export const createOrder = (reqData) => async (dispatch) => {
    dispatch({ type: CREATE_ORDER_REQUEST });
    try {
        const { data } = await api.post(`/api/orders`, reqData);
        console.log(data, "ORDER-create");

        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });

        if (data._id) {
            // Navigate to the order summary with step=3 and order_id
            reqData.navigate(`/checkout?step=3&order_id=${data._id}`);
        }
    } catch (error) {
        console.error("Error creating order:", error.response ? error.response.data : error.message);
        dispatch({ type: CREATE_ORDER_FAILURE, payload: error.message });
    }
};



export const getOrderById = (orderId) => async (dispatch) => {
    dispatch({ type: GET_ORDER_BY_ID_REQUEST })
    try {
        const { data } = await api.get(`api/orders/${orderId}`);
        console.log("order-by-id", data)
        dispatch({ type: GET_ORDER_BY_ID_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: GET_ORDER_BY_ID_FAILURE })
    }
}

export const getOrdersByUserId = () => async (dispatch) => {
    dispatch({ type: GET_ORDERS_BY_USER_ID_REQUEST });
    try {
        const { data } = await api.get(`/api/orders/user-orders`); // Adjust the API endpoint as necessary
        console.log("orders-by-user", data);
        dispatch({ type: GET_ORDERS_BY_USER_ID_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_ORDERS_BY_USER_ID_FAILURE });
    }
}
