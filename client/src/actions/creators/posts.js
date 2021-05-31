import { FETCH_ALL, FETCH_BY_SEARCH, START_LOADING, END_LOADING, CREATE, UPDATE, DELETE, LIKE, FETCH_POST } from '../types/posts';
import * as api from '../../api';

export const getPost = (id) => async dispatch => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPost(id);
        dispatch({
            type: FETCH_POST,
            payload: data.data
        })
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const getPosts = (page) => async dispatch => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPosts(page);
        dispatch({
            type: FETCH_ALL,
            payload: {
                data: data.data,
                currentPage: data.currentPage,
                numOfPages: data.numOfPages
            }
        })
        dispatch({ type: END_LOADING });
    } catch(error) {
        console.log(error);
    }   
}

export const createPost = (post, history) => async dispatch => {
    try {
        dispatch({ type: START_LOADING });
        const response = await api.createPost(post);
        history.push(`/posts/${response.data.data._id}`)
        dispatch({
            type: CREATE,
            payload: response.data.data
        })
        dispatch({ type: END_LOADING });
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

export const getPostsBySearch = (searchQuery) => async dispatch => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        dispatch({
            type: FETCH_BY_SEARCH,
            payload: data
        })
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}