import { AUTH_USER, AUTH_LOADING, AUTH_LOGOUT } from "../types";
import { URL, URL_USER } from "../apiUrl";
import Axios from "axios";
import AsyncStorage from '@react-native-community/async-storage';


export const getUser = id => async dispatch => {
    dispatch({ type: AUTH_LOADING, payload: true });
    return Axios.get(URL + URL_USER + `?id=${id}`)
        .then(res => {
            dispatch({ type: AUTH_USER, payload: res.data });
        }).catch(error => {
            //console.log(error.response);
        }).finally(() => dispatch({ type: AUTH_LOADING, payload: false }))
};

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



