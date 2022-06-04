import { FETCH_ALL, FETCH_PROFILE_POSTS, FETCH_SEARCH_POSTS, CREATE_COMMENT } from '../constants/actionTypes';


const posts = (posts = [], action) => {
    switch (action.type) {
      case FETCH_ALL:
        return action.payload;
      case FETCH_PROFILE_POSTS:
        return action.payload;
      case FETCH_SEARCH_POSTS:
        return action.payload;
      case CREATE_COMMENT:
        return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
      default:
        return posts;
    }
  };


  export default posts;