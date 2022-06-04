import axios from 'axios'
import {getPostsStart, getPostsSuccess, getPostsFailure } from './GetPosts'


// export const fetchPost = createAsyncThunk("getPost", async (userId) => {
//     const res = await axios.get("/post/timeline/" + userId);
//     return res.data;
// })

export const fetchPost = async (dispatch, userId, token) =>{
    dispatch(getPostsStart());
    try{
        const res = await axios.get("/post/timeline/" + userId ,{
            headers: {
                token: "Bearer " + token,
            },
        });
        dispatch(getPostsSuccess(res.data));
    }catch(err){
        dispatch(getPostsFailure());
        console.log(err)
    }
};
