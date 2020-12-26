import {
    GET_MY_POSTS,
    GET_POSTS,
    ADD_POST,
    POST_ERROR,
    POST_LOADING,
    POST_LIKE,
    POST_UNLIKE,
    GET_MY_LIKES,
} from '../types'
import { URL_LIKE, URL_UNLIKE, URL, URL_POST } from '../apiUrl'
import Axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

export const getPosts = (pageNumber) => async (dispatch) => {
    const token = await AsyncStorage.getItem('token')

    dispatch({ type: POST_LOADING })
    return Axios.get(URL + URL_POST + `?pageNumber=${pageNumber}&pageSize=20`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
        .then((res) => {
            dispatch({ type: GET_POSTS, payload: res })
        })
        .catch((error) => {
            console.log(error.response)
        })
}

export const getUserPosts = (pageNumber) => async (dispatch) => {
    const token = await AsyncStorage.getItem('token')
    dispatch({ type: POST_LOADING })
    return Axios.get(URL + URL_POST + `myPosts?pageNumber=${pageNumber}&pageSize=20`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
        .then((res) => {
            dispatch({ type: GET_MY_POSTS, payload: res })
        })
        .catch((error) => {
            console.log(error.response)
        })
}

export const addPost = (data) => async (dispatch) => {
    const token = await AsyncStorage.getItem('token')

    dispatch({ type: POST_LOADING })
    return Axios.post(URL + URL_POST, data, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    })
        .then((res) => {
            dispatch({ type: ADD_POST, payload: res.data })
        })
        .catch((error) => {
            console.log(error)
            dispatch({ type: POST_ERROR })
        })
}

export const addPoint = (data) => async (dispatch) => {
    const token = await AsyncStorage.getItem('token')

    try {
        dispatch({ type: POST_LIKE, payload: data })
        await Axios.post(URL + URL_POST + URL_LIKE + "?id=" + data, null, {
            headers: { Authorization: `Bearer ${token}` },
        })
    } catch (error) {
        dispatch({ type: POST_LIKE, payload: data })
    }
}

export const removePoint = (data) => async (dispatch) => {
    const token = await AsyncStorage.getItem('token')
    try {
        dispatch({ type: POST_UNLIKE, payload: data })
        await Axios.post(URL + URL_POST + URL_UNLIKE + "?id=" + data, null, {
            headers: { Authorization: `Bearer ${token}` },
        })
    } catch (error) {
        dispatch({ type: POST_LIKE, payload: data })
    }
}

export const getMyLikes = () => async dispatch => {
    const token = await AsyncStorage.getItem('token')
    dispatch({ type: POST_LOADING })
    return Axios.get(URL + URL_POST + `mylikes`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => {
            dispatch({ type: GET_MY_LIKES, payload: res.data });
        }).catch(error => {
            dispatch({ type: POST_ERROR });
        })
};
