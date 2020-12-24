import { AUTH_USER, AUTH_LOADING, AUTH_LOGOUT, AUTH_ERROR } from "../types";
import { URL, URL_USER, URL_AUTH, URL_AUTH_SIGNUP, URL_AUTH_LOGIN } from "../apiUrl";
import Axios from "axios";
import AsyncStorage from '@react-native-community/async-storage';


export const getUser = id => async dispatch => {
    dispatch({ type: AUTH_LOADING, payload: true });
    return Axios.get(URL + URL_AUTH + `?id=${id}`)
        .then(res => {
            dispatch({ type: AUTH_USER, payload: res.data });
        }).catch(error => {
            //console.log(error.response);
        }).finally(() => dispatch({ type: AUTH_LOADING, payload: false }))
};

export const signUp = user => async dispatch => {
    dispatch({ type: AUTH_LOADING, payload: true });
    
    return Axios.post(URL + URL_AUTH + URL_AUTH_SIGNUP, user)
    .then(res => {
        console.log(res.data)
        dispatch({ type: AUTH_USER, payload: res.data });
    }).catch(error => {
        console.log(error.response);
    }).finally(() => dispatch({ type: AUTH_LOADING, payload: false }))
}

export const login = user => async dispatch => {
    dispatch({ type: AUTH_LOADING, payload: true })
    ;
    return Axios.post(URL + URL_AUTH + URL_AUTH_LOGIN, user)
    .then(async res => {
        dispatch({ type: AUTH_USER, payload: res.data });
        dispatch({ type: AUTH_ERROR, payload: false });

        console.log(res.data)
        
        await AsyncStorage.setItem("token", res.data.token)
    }).catch(error => {
        // console.log(error.response);
        dispatch({ type: AUTH_ERROR, payload: true });
    }).finally(() => dispatch({ type: AUTH_LOADING, payload: false }))
}
export const logout = () => async dispatch => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        await AsyncStorage.multiRemove(keys);
        dispatch({
            type: AUTH_LOGOUT            
        });
    } catch (error) {
        console.error('Error clearing app data.');
    }
};



