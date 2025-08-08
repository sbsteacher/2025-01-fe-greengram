import axios from './httpRequester';

const path = '/user'

export const signUp = (args) => {
  return axios.post(`${path}/sign-up`, args).catch((e) => e.response);
};

export const signIn = (args) => {
  return axios.post(`${path}/sign-in`, args).catch((e) => e.response);
};

export const signOut = () => {
  return axios.post(`${path}/sign-out`).catch((e) => e.response);
};

export const reissue = () => {
  return axios.post(`${path}/reissue`).catch((e) => e.response);
};
