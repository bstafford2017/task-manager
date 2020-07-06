import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    UPDATE_USER,
    DELETE_USER,
} from '../types'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    user: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true,
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload,
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
            }
        case AUTH_ERROR:
        case LOGIN_ERROR:
        case LOGOUT_SUCCESS:
        case REGISTER_ERROR:
        case DELETE_USER:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                user: {},
                isAuthenticated: false,
                isLoading: false,
            }
        case UPDATE_USER:
            return {
                ...state,
                user: action.payload,
            }
        default:
            return {
                ...state,
            }
    }
}
