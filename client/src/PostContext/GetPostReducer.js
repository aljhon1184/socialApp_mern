const GetPostReducer = ( state, action ) => {
    switch (action.type){
        case "GET_POST_START":
            return{
                posts: [],
                isFetching: true,
                error: false,
            };
        case "GET_POST_SUCCESS":
            return {
                posts: action.payload,
                isFetching: false,
                error: false,
            };
        case "GET_POST_FAILURE":
            return{
                posts: [],
                isFetching: false,
                error: true,
            };
        // case "UPDATE_START":
        //     return{
        //         ...state,
        //         isFetching: true
        //     };
        // case "UPDATE_SUCCESS":
        //     return{
        //         user: action.payload,
        //         isFetching: false,
        //         error: false,
        //     };
        // case "UPDATE_FAILURE":
        //     return{
        //         user: state.user,
        //         isFetching: false,
        //         error:true,
        //     };
        // case "LOGOUT":
        //     return{
        //         user: null,
        //         isFetching: false,
        //         error: false,
        //     };
        default:
            return state;
    }
};

export default GetPostReducer;