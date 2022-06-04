const AuthReducer = ( state, action ) => {
    switch (action.type){
        case "LOGIN_START":
            return{
                user: null,
                isFetching: true,
                error: false,
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false,
            };
        case "LOGIN_FAILURE":
            return{
                user: null,
                isFetching: false,
                error: true,
            };
        case "UPDATE_START":
            return{
                ...state,
                isFetching: true
            };
        case "UPDATE_SUCCESS":
            return{
                // user: action.payload,
                // isFetching: false,
                // error: false,
                ...state,
                user: {
                    ...state.user,
                    username: state.user.username = action.payload.username,
                    email: state.user.email = action.payload.email,
                    city: state.user.city = action.payload.city,
                    from: state.user.from = action.payload.from,
                },
            };
        case "UPDATE_FAILURE":
            return{
                user: state.user,
                isFetching: false,
                error:true,
                
            };
        case "FOLLOW":
             return{
                ...state,
                user: {
                    ...state.user,
                    followings: [...state.user.followings, action.payload],
                },
            };
        case "UNFOLLOW":
             return{
                ...state,
                user: {
                    ...state.user,
                    followings: state.user.followings.filter(
                        (following) => following !== action.payload
                    ),
                },
            };    
        case "UPDATE_PROFILE_PIC":
             return{
                ...state,
                user: {
                    ...state.user,
                    profilePicture: state.user.profilePicture = action.payload.profilePicture,
                },
            };    
        case "UPDATE_COVER_PIC":
             return{
                ...state,
                user: {
                    ...state.user,
                    coverPicture: state.user.coverPicture = action.payload.coverPicture,
                },
            };    
        case "LOGOUT":
            return{
                user: null,
                isFetching: false,
                error: false,
            };
        default:
            return state;
    }
};

export default AuthReducer;