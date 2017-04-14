import firebase from 'firebase';

import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL
} from './types';

export const handleGoogleSignIn = () => {

    return (dispatch) => {
        const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider)
            .then(result => loginUserSuccess(dispatch, result))
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                const credential = error.credential;
                // ...
                loginUserFail(dispatch)
            });
        }
}

const loginUserFail = (dispatch) => {
    dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, result) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: result
    });
};
