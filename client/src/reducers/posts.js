import { FETCH_ALL, CREATE } from '../actions/types/posts';

const initialState = {
    posts: []
}

export const postsReducer = (state=initialState, action) => {
    switch(action.type) {
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload
            };
        case CREATE:
            return {
                ...state,
                posts: [...state.posts, action.payload]
            };
        default: return state;
    }
}