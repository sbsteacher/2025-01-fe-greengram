import axios from './httpRequester';

const path = '/user'

export const signUp = data => axios.post(`${path}/sign-up`, data);

export const signIn = data => axios.post(`${path}/sign-in`, data);

export const signOut = () => axios.post(`${path}/sign-out`);

export const reissue = data => axios.post(`${path}/reissue`, data);

export const getUserProfile = params => axios.get(`${path}/profile`, { params });

export const patchUserProfilePic = data => axios.patch(`${path}/profile/pic`, data);

export const deleteUserProfilePic = () => axios.delete(`${path}/profile/pic`);