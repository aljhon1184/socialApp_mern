import axios from 'axios';


const API = axios.create({ baseURL: "http://localhost:5000/api" });

// API.interceptors.request.use((req) =>{
//     if(localStorage.getItem('profile')){
//         req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).accessToken}`
//     }

//     return req;
// })



export const fetchPosts = (id,token) => API.get(`/post/timeline/${id}`, {
    headers: {
        token: "Bearer " + token,
    },
});
export const fetchProfilePost = (username, token) => API.get(`/post/profile/${username}`, {
    headers: {
        token: "Bearer " + token,
    },
});
export const fetchSearchPost = (username, token) => API.get(`/post/${username}`, {
    headers: {
        token: "Bearer " + token,
    },
});

export const createComment = (value, postId, token) => API.put(`/post/${postId}/comment`, value , {
    headers: {
        token: "Bearer " + token,
    },
});