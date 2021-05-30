import { AUTH, LOGOUT } from '../actions/types/auth';

const initialState = { authData: null };

export const authReducer = (state=initialState, action) => {
    switch(action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({...action?.payload}))
            return {
                ...state,
                authData: action?.payload
            }
        case LOGOUT:
            localStorage.clear();
            return {
                ...state,
                authData: null
            }
        default: return state;
    }
}