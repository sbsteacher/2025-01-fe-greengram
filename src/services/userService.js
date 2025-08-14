import axios from './httpRequester';

const path = '/user'

export const signUp = args => {
  return axios.post(`${path}/sign-up`, args).catch((e) => e.response);
};

export const signIn = args => {
  return axios.post(`${path}/sign-in`, args).catch((e) => e.response);
};

export const signOut = () => {
  return axios.post(`${path}/sign-out`).catch((e) => e.response);
};

export const reissue = data => {
  return axios.post(`${path}/reissue`, data).catch((e) => e.response);
};

export const getUserProfile = params => axios.get(`${path}/profile`, { params }).catch((e) => e.response);
