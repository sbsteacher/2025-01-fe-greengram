import axios from './httpRequester';

const path = '/feed/comment';

export const postComment = data => axios.post(path, data).catch((e) => e.response);
export const getCommentList = params = axios.get(path, { params }).catch((e) => e.response);
export const deleteComment = params => axios.delete(path, { params }).catch((e) => e.response);

