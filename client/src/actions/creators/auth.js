import { AUTH } from '../types/auth';
import * as api from '../../api';

export const signIn = (formData, history) => async dispatch => {
    try {
        const response = await api.signIn(formData);
        console.log(response);
        dispatch({
            type: AUTH,
            payload: {
                result: response.data.data,
                token: response.data.token
            }
        })
        history.push('/'); 
    } catch (error) {
        console.log(error);
    }
}

export const signUp = (formData, history) => async dispatch => {
    try {
        const response = await api.signUp(formData);
        dispatch({
            type: AUTH,
            payload: {
                result: response.data.data,
                token: response.data.token
            }
        })
        history.push('/');
    } catch (error) {
        console.log(error);
    }
}