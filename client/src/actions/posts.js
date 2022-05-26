import * as api from '../api';
import { UPDATE, FETCH_POST, START_LOADING, END_LOADING, FETCH_ALL, DELETE, CREATE } from '../constants/ActionTypes';

//Action Creators
export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPost(id);

        dispatch({ type: FETCH_POST, payload: { post: data } });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
};

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page);
        const action = { type: FETCH_ALL, payload: { data, currentPage, numberOfPages } };
        dispatch(action);
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
}



export const createPost = (history,post) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.createPost(post);
        const action = { type: CREATE, payload: data };
        dispatch(action);
        history.push('/');
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const updatepost = (history,id, post) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        dispatch({ type: UPDATE, payload: post });
        await api.updatePost(id, post);
        history.push('/');
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const deletepost = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE, payload: id})
        await api.deletePost(id); 
    } catch (error) {
        console.log(error);
    }
}

export const likepost = (post) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE, payload: post });
         await api.likePost(post._id);
    } catch (error) {
        console.log(error);
    }
}