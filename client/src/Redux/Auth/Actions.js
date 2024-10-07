import { API_BASE_URL } from '../../Config/apiConfig';
import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    LOGOUT,
    UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE,
    GET_ALL_USER_FAILURE, GET_ALL_USER_REQUEST, GET_ALL_USER_SUCCESS, UPADTE_ADDRESS_SUCCESS,
    DELETE_ADDRESS_SUCCESS
} from './ActionType';
import axios from 'axios';
import { api } from '../../Config/apiConfig';

// REGISTER PROCESS



export const register = (userData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST })
    try {
        const res = await axios.post(`${API_BASE_URL}/auth/register`, userData)
        const user = res.data;
        if (user.jwt) {
            localStorage.setItem("jwt", user.jwt)
        }

        dispatch({
            type: REGISTER_SUCCESS,
            payload: user
        })
    } catch (error) {
        dispatch({
            type: REGISTER_FAILURE,
            payload: error.response ? error.response.data : error.message
        })
    }
}

// LOGIN PROCESS





export const login = (userData, navigate) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const res = await axios.post(`${API_BASE_URL}/auth/login`, userData);
        const user = res.data;

        if (user.jwt) {

            localStorage.setItem("jwt", user.jwt);
        }

        // Dispatch login success
        dispatch({
            type: LOGIN_SUCCESS,
            payload: user.jwt,
        });

        // Navigate based on user role
        if (user.user.role === "ADMIN") {
            navigate("/admin"); // Navigate to admin route
        } else {
            navigate("/"); // Navigate to user dashboard or another route for regular users
        }

    } catch (error) {
        // Dispatch login failure
        dispatch({
            type: LOGIN_FAILURE,
            payload: error.response ? error.response.data : error.message
        });
    }
};


// USER GET PROCESS




export const getUser = (jwt) => async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST })
    try {
        const res = await axios.get(`${API_BASE_URL}/api/users/profile`, {
            headers: {
                "Authorization": `Bearer ${jwt}`
            }
        })
        const user = res.data;

        dispatch({
            type: GET_USER_SUCCESS,
            payload: user
        })
    } catch (error) {
        dispatch({
            type: GET_USER_FAILURE,
            payload: error.message
        })
    }
}

// LOGOUT


export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT, payload: null })
    localStorage.clear();

}
export const getAllUser = () => async (dispatch) => {
    dispatch({ type: GET_ALL_USER_REQUEST });
    try {
        const res = await api.get(`${API_BASE_URL}/api/users`);

        // Dispatch success action with fetched users as payload
        dispatch({
            type: GET_ALL_USER_SUCCESS,
            payload: res.data // Assuming the response contains the users in res.data
        });
    } catch (error) {
        dispatch({
            type: GET_ALL_USER_FAILURE,
            payload: error.message
        });
    }
};



export const updateUser = (updatedUserData, jwt) => async (dispatch) => {
    dispatch({ type: UPDATE_USER_REQUEST });
    try {
        const res = await axios.put(`${API_BASE_URL}/api/users/update-user`, updatedUserData, {
            headers: {
                "Authorization": `Bearer ${jwt}`,
                "Content-Type": "multipart/form-data"
            }
        });

        const updatedUser = res.data.user;

        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: updatedUser
        });
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAILURE,
            payload: error.response?.data?.message || error.message
        });
    }
};

export const updateAddress = (addressId, Addressdata) => async (dispatch) => {
    try {
        const res = await api.put(`${API_BASE_URL}/api/users/update-address/${addressId}`, Addressdata);
        const updatedAddress = res.data;
        dispatch({
            type: UPADTE_ADDRESS_SUCCESS,
            payload: updatedAddress
        });


    } catch (error) {
        console.error('Error updating address:', error);
    }
}
export const removeAddress = (addressId) => async (dispatch) => {
    try {
        const { data } = await api.delete(`/api/users/remove-address/${addressId}`, {
            headers: { 'Content-Type': 'application/json' }
        });

        dispatch({ type: DELETE_ADDRESS_SUCCESS, payload: data });
    } catch (error) {
        console.log(error)
    }
};

