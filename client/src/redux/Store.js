import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./GetPosts";
// import profilePostReducer from "./GetprofilePost"
// import getSearchPost from "./getSearchPost";


export default configureStore( {
    reducer: {
        post: postReducer,
    },
})