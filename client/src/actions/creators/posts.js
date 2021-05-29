import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../types/posts';
import * as api from '../../api';

export const getPosts = () => async dispatch => {
    try {
        const response = await api.fetchPosts();
        dispatch({
            type: FETCH_ALL,
            payload: response.data.data
        })
    } catch(error) {
        console.log(error.message);
    }   

}

export const createPost = post => async dispatch => {
    try {
        const response = await api.createPost(post);
        dispatch({
            type: CREATE,
            payload: response.data.data
        })
    } catch (error) {
        console.log(error.message)
    }
}

export const updatePost = (id, updatedPost) => async dispatch => {
    try {
        const response = await api.updatePost(id, updatedPost);
        dispatch({
            type: UPDATE,
            payload: response.data.data
        })
    } catch(error) {
        console.log(error.message);
    }
}

export const deletePost = id => async dispatch => {
    try {
        await api.deletePost(id);
        dispatch({
            type: DELETE,
            payload: id
        })
    } catch(error) {
        console.log(error);
    }
}

export const likePost = id => async dispatch => {
    try {
        const response = await api.likePost(id);
        dispatch({
            type: LIKE,
            payload: response.data.data
        })
    } catch (error) {
        console.log(error.message);
    }
}