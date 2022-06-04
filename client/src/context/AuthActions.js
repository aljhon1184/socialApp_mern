export const LoginStart = () => ({
    type: "LOGIN_START",
});

export const LoginSuccess = (user) =>({
    type: "LOGIN_SUCCESS",
    payload: user,
});

export const LoginFailure = () => ({
    type: "LOGIN_FAILURE",
});

export const Logout = () => ({
    type: "LOGOUT",
});

export const UpdateStart = () => ({
    type: "UPDATE_START",
});

export const UpdateSuccess = (user) => ({
    type: "UPDATE_SUCCESS",
    payload: user,
});

export const UpdateFailure = () => ({
    type: "UPDATE_FAILURE",
});

export const follow = (userId) => ({
    type: "FOLLOW",
    payload: userId,
});
export const unFollow = (userId) => ({
    type: "UNFOLLOW",
    payload: userId,
});
export const updateProfilePic = (profile) => ({
    type: "UPDATE_PROFILE_PIC",
    payload: profile,
});
export const updateCoverPic = (cover) => ({
    type: "UPDATE_COVER_PIC",
    payload: cover,
});