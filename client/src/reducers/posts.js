import { FETCH_POST, FETCH_ALL, FETCH_BY_SEARCH, START_LOADING, END_LOADING, CREATE, UPDATE, DELETE, LIKE } from '../actions/types/posts';

const initialState = {
    isLoading: false,
    posts: [],
}

export const postsReducer = (state=initialState, action) => {
    switch(action.type) {
        case FETCH_POST:
            return {
                ...state,
                post: action.payload
            }
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            };
        case CREATE:
            return {
                ...state,
                posts: [...state.posts, action.payload]
            };
        case UPDATE:
            return {
                ...state,
                posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post)
            }
        case DELETE:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload)
            }
        case LIKE:
            return {
                ...state,
                posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post)
            }
        case FETCH_BY_SEARCH:
            return {
                ...state,
                posts: action.payload
            }
        case START_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case END_LOADING:
            return {
                ...state,
                isLoading: false
            }
        default: return state;
    }
}