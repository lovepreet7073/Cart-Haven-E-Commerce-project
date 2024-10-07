import { api } from "../../Config/apiConfig"
import { ADD_ITEM_TO_CART_FAILURE, ADD_ITEM_TO_CART_REQUEST, ADD_ITEM_TO_CART_SUCCESS, GET_CART_FAILURE, GET_CART_REQUEST, GET_CART_SUCCESS, REMOVE_CART_ITEM_FAILURE, REMOVE_CART_ITEM_REQUEST, REMOVE_CART_ITEM_SUCCESS, UPDATE_CART_ITEM_FAILURE, UPDATE_CART_ITEM_REQUEST, UPDATE_CART_ITEM_SUCCESS } from "./ActionType"



export const getCart = () => async (dispatch) => {
    dispatch({ type: GET_CART_REQUEST })
    try {
        const { data } = await api.get(`/api/cart`)
        console.log(data,'dta')
        dispatch({ type: GET_CART_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: GET_CART_FAILURE, payload: error.message })
    }
}

export const addItemToCart = (reqData) => async (dispatch) => {

    dispatch({ type: ADD_ITEM_TO_CART_REQUEST });
    
    try {
        const { data } = await api.put(`/api/cart/add`, reqData)
        dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: ADD_ITEM_TO_CART_FAILURE, payload: error.message })
    }
}

export const removeCartItem = (reqData) => async (dispatch) => {
    dispatch({ type: REMOVE_CART_ITEM_REQUEST });
    console.log(reqData, "removeCartItem");

    try {
        // Correctly send userId in the data for DELETE request
        const { data } = await api.delete(`/api/cartitem/${reqData.cartItemId}`, reqData, {
            headers: { 'Content-Type': 'application/json' }
        });

        dispatch({ type: REMOVE_CART_ITEM_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: REMOVE_CART_ITEM_FAILURE, payload: error.message });
    }
};


export const updateCartItem = (reqData) => async (dispatch) => {
    console.log(reqData, "Request Data"); // Log the reqData to check the values
    dispatch({ type: UPDATE_CART_ITEM_REQUEST });
    try {
        const { data } = await api.put(`/api/cartitem/${reqData.cartItemId}`, reqData, {
            headers: { 'Content-Type': 'application/json' }
        });
        dispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: UPDATE_CART_ITEM_FAILURE, payload: error.message });
    }
};

