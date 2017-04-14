import {
    FETCH_POSTS
} from '../actions/types';

const INITIAL_STATE = {
    allPosts: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_POSTS:
            return {
                ...state,
                allPosts: action.payload
            }
        default:
            return state;
    }
}