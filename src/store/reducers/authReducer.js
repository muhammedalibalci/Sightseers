import { AUTH_USER, AUTH_LOADING, AUTH_LOGOUT, AUTH_ERROR } from "../types";

const initialState = {
    user: {},
    isAuthenticated: false,
    loading: false,
    error: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTH_USER:
            return {
                ...state,
                isAuthenticated: true,
                loading: true,
                user: action.payload
            };
        case AUTH_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case AUTH_LOGOUT:
            return {
                user: null,
                isAuthenticated: false,
                isLoading: false,
            };;
        case AUTH_ERROR:
            return {
                ...state,
                error: action.payload,
            }
        default:
            return state;
    }
};  