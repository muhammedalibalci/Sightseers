import {
    GET_MY_POSTS,
    GET_POSTS,
    ADD_POST,
    POST_ERROR,
    POST_LOADING,
    ADD_POINT,
    REMOVE_POINT,
} from '../types'
import { DOWN_VOTE, UP_VOTE, URL, URL_POST } from '../apiUrl'
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
        dispatch({ type: ADD_POINT, payload: data })
        await Axios.post(URL + URL_POST + UP_VOTE + data, null, {
            headers: { Authorization: `Bearer ${token}` },
        })
    } catch (error) {
        dispatch({ type: REMOVE_POINT, payload: data })
    }
}

export const removePoint = (data) => async (dispatch) => {
    const token = await AsyncStorage.getItem('token')
    try {
        dispatch({ type: REMOVE_POINT, payload: data })
        await Axios.post(URL + URL_POST + DOWN_VOTE + data, null, {
            headers: { Authorization: `Bearer ${token}` },
        })
    } catch (error) {
        dispatch({ type: ADD_POINT, payload: data })
    }
}
