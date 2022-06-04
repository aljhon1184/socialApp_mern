import { createSlice } from "@reduxjs/toolkit"
export const getPosts = createSlice( {
    name: "post",
    initialState: {
        posts: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        getPostsStart: (state) => {
            state.isFetching = true;
          },
          getPostsSuccess: (state, action) => {
            state.isFetching = false;
            state.posts = action.payload;
          },
          getPostsFailure: (state) => {
            state.isFetching = false;
            state.error = true;
          },
    },
});


export const { getPostsStart, getPostsSuccess, getPostsFailure } = getPosts.actions;
export default getPosts.reducer;