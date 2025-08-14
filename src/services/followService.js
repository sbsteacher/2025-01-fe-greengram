import axios from './httpRequester';

const path = '/user/follow'

export const postUserFollow = args => axios.post(path, args).catch((e) => e.response);

export const deleteUserFollow = params => axios.delete(path, { params }).catch((e) => e.response);

