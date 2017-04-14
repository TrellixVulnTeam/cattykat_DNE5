import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER
} from '../actions/types';

const INITIAL_STATE = {
    userDisplayName: '',
    userPhotoURL: '',
    userToken: '',
    isLoggedIn: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                userDisplayName: action.payload.user.displayName,
                userPhotoURL: action.payload.user.photoURL,
                userToken: action.payload.credential.accessToken,
                isLoggedIn: true 
            };
        case LOGIN_USER_FAIL:
            return { ...state,
                error: 'Authentication Failed.',
                isLoggedIn: false
            };
        case LOGIN_USER:
            return { ...state, loading: true, error: '' };
        default:
            return state;
    }
};
