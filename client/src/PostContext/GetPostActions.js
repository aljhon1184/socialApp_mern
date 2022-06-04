export const getPostStart = () => ({
    type: "GET_POST_START",
});

export const getPostStartSuccess = (posts) =>({
    type: "GET_POST_SUCCESS",
    payload: posts,
});

export const getPostStartFailure = (err) => ({
    type: "GET_POST_FAILURE",
});

// export const Logout = () => ({
//     type: "LOGOUT",
// });

// export const UpdateStart = () => ({
//     type: "UPDATE_START",
// });

// export const UpdateSuccess = (user) => ({
//     type: "UPDATE_SUCCESS",
//     payload: user,
// });

// export const UpdateFailure = () => ({
//     type: "UPDATE_FAILURE",
// });