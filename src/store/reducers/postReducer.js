import {
    POST_LOADING,
    GET_POSTS,
    ADD_POST,
    POST_ERROR,
    POST_LIKE,
    POST_UNLIKE,
    CLEAR_POST,
    INCREASE_COMMENTS,
    GET_MY_POSTS,
    GET_MY_LIKES,
} from '../types'

const initialState = {
    posts: [],
    myPosts: [],
    myLikes: [],
    categories: [],
    categoryNumber: 1,
    pagination: {},
    loading: true,
    error: null,
}

export default (state = initialState, action) => {
    const { payload } = action
    switch (action.type) {
        case GET_POSTS:
            const pagination = JSON.parse(payload.headers.pagination)
            return {
                ...state,
                posts:
                    pagination.CurrentPage == 1
                        ? [...payload.data]
                        : [...state.posts, ...payload.data],
                pagination,
                loading: false,
            }
        case GET_MY_POSTS:
            const upagination = JSON.parse(payload.headers.pagination)
            return {
                ...state,
                myPosts:
                    upagination.CurrentPage == 1
                        ? [...payload.data]
                        : [...state.myPosts, ...payload.data],
                upagination,
                loading: false,
            }
        case ADD_POST:
            return {
                ...state,
                posts: [payload].concat(state.posts),
                myPosts: [payload].concat(state.myPosts),
                loading: false,
                error: null,
            }
        case POST_LOADING:
            return {
                ...state,
                loading: true,
            }
        case POST_ERROR:
            return {
                ...state,
                error: true,
                loading: false,
            }
        case POST_LIKE:
            // var updatedPosts = state.posts.map(x => x.id == payload ? (++x.pointCount && x) : x)
            var updatedPost = state.posts.find(x => x.id === payload)
            updatedPost.pointCount++;
            updatedPost.isPointed = true

            return {
                ...state,
                posts: state.posts.map(x => x.id == payload ? (updatedPost) : x),
                myLikes: [...state.myLikes, updatedPost],
                loading: false,
            }
        case POST_UNLIKE:
            var updatedPost = state.posts.find(x => x.id === payload)
            updatedPost.pointCount--;
            updatedPost.isPointed = false
            return {
                ...state,
                posts: state.posts.map(x => x.id == payload ? (updatedPost) : x),
                myLikes: state.myLikes.filter(x => x.id !== payload),
                loading: false,
            }
            case GET_MY_LIKES:
            return {
                ...state,
                myLikes:
                    payload.headers.pagination.CurrentPage == 1
                        ? [...payload.data]
                        : [...state.myLikes, ...payload.data],
                pagination: JSON.parse(payload.headers.pagination),
                loading: false,
            }
        case INCREASE_COMMENTS:
            return {
                ...state,
                posts: state.posts.map(
                    post => post.id === payload ? { ...post, commentCount: post.commentCount += 1 }
                        : post),
                myPosts: state.myPosts.map(
                    post => post.id === payload ? { ...post, commentCount: post.commentCount += 1 }
                        : post),
                loading: false
            }
        case CLEAR_POST:
            return {
                ...state,
                posts: []
            }
        default:
            return state
    }
}
