import { FETCH_ALL, CREATE } from '../types/posts';
import * as api from '../../api';
import { CardActions } from '@material-ui/core';

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