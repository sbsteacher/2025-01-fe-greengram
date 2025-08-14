import axios from './httpRequester';

const path = '/user'

export const signUp = data => axios.post(`${path}/sign-up`, data).catch((e) => e.response);

export const signIn = data => axios.post(`${path}/sign-in`, data).catch((e) => e.response);

export const signOut = () => axios.post(`${path}/sign-out`).catch((e) => e.response);

export const reissue = data => axios.post(`${path}/reissue`, data).catch((e) => e.response);

export const getUserProfile = params => axios.get(`${path}/profile`, { params }).catch((e) => e.response);

export const patchUserProfilePic = data => axios.patch(`${path}/profile/pic`, data).catch((e) => e.response);