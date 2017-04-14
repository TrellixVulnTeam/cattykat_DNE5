import firebase from 'firebase';

import {
    FETCH_POSTS
} from './types';

export const fetchPosts = () => {
    return (dispatch) => {
        firebase.database().ref('posts').orderByKey().on('value', snap => fetchPostsSuccess(dispatch, snap.val()));
    }
}

const fetchPostsSuccess= (dispatch, posts) => {
    dispatch({
        type: FETCH_POSTS,
        payload: posts
    });
}