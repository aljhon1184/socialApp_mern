import { CREATE_COMMENT, FETCH_ALL, FETCH_PROFILE_POSTS, FETCH_SEARCH_POSTS } from '../constants/actionTypes';

import * as api from '../api/index.js';


export const getPosts = (id, token) => async (dispatch) =>{
    try{
        const { data } = await api.fetchPosts(id,token);
           
        dispatch({ type: FETCH_ALL, payload: data });
    }catch(err){
        console.log(err)
    }
};
export const getProfilePosts = (username, token) => async (dispatch) =>{
    try{
        const { data } = await api.fetchProfilePost(username, token);
           
        dispatch({ type: FETCH_PROFILE_POSTS, payload: data });
    }catch(err){
        console.log(err)
    }
};
export const getSearchPosts = (username, token) => async (dispatch) =>{
    try{
        const { data } = await api.fetchProfilePost(username, token);
           
        dispatch({ type: FETCH_SEARCH_POSTS, payload: data });
    }catch(err){
        console.log(err)
    }
};

export const createComment = (value, postId, token) => async (dispatch) =>{
    try{
       const { data } = await api.createComment(value, postId, token);

        dispatch({ type: CREATE_COMMENT, payload: data});
    }catch(error){
        console.log(error);
    }
}