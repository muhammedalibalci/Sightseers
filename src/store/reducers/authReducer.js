import { AUTH_USER, AUTH_LOADING, AUTH_LOGOUT } from "../types";

const initialState = {
    user: {},
    isAuthenticated: false,
    loading: false,
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
        default:
            return state;
    }
};  