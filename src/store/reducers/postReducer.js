import {
    POST_LOADING,
    GET_POSTS,
    ADD_POST,
    POST_ERROR,
    POST_LIKE,
    POST_UNLIKE,
    CLEAR_POST,
    INCREASE_COMMENTS,
} from '../types'

const initialState = {
    posts: [],
    myPoints: [],
    categories: [],
    categoryNumber: 1,
    pagination: {},
    loading: false,
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
        case ADD_POST:
            return {
                ...state,
                posts: [payload].concat(state.posts),
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
                myPoints: [...state.myPoints, updatedPost],
                loading: false,
            }
        case POST_UNLIKE:
            var updatedPost = state.posts.find(x => x.id === payload)
            updatedPost.pointCount--;
            updatedPost.isPointed = false
            return {
                ...state,
                posts: state.posts.map(x => x.id == payload ? (updatedPost) : x),
                myPoints: state.myPoints.filter(x => x.id !== payload),
                loading: false,
            }
        case INCREASE_COMMENTS:
            return {
                ...state,
                posts: state.posts.map(
                    post => post.id === payload ? { ...post, commentCount: post.commentCount += 1 }
                        : post),
                myPoints: state.myPoints.map(
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
