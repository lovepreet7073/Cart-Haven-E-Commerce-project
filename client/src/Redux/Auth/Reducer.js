import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, LOGIN_REQUEST, LOGOUT,UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE,GET_ALL_USER_FAILURE,GET_ALL_USER_REQUEST,GET_ALL_USER_SUCCESS,UPADTE_ADDRESS_SUCCESS,DELETE_ADDRESS_SUCCESS  } from "./ActionType"
const initialState = {
    user: null,
    isLoading: false,
    error: null,
    jwt: null
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
            case GET_ALL_USER_REQUEST:
            return { ...state, isLoading: true, error: null }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return { ...state, isLoading: false, error: null, jwt: action.payload }
        case GET_USER_SUCCESS:
            return { ...state, isLoading: false, error: null, user: action.payload }
        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
            
            return { ...state, isLoading: false, error: action.payload }
            case GET_ALL_USER_SUCCESS:
                return {
                    ...state,
                    allusers: action.payload,
                    isLoading: false
                }
        case LOGOUT:
            return { ...initialState }
            case UPDATE_USER_REQUEST:
                return { ...state, loading: true };
            case UPDATE_USER_SUCCESS:
                return { ...state, loading: false, user: action.payload, error: null };
            case UPDATE_USER_FAILURE:
                case GET_ALL_USER_FAILURE:
                return { ...state, loading: false, error: action.payload };
                case    UPADTE_ADDRESS_SUCCESS:
                    return {
                        ...state,
                        updatedAddress:action.payload,
                        loading: false,
                    }
                    case DELETE_ADDRESS_SUCCESS:
                    return {
                        ...state,
                        deleteaddress:action.payload,
                        loading: false,
                    }
        
        default:
            return state;
    }
}