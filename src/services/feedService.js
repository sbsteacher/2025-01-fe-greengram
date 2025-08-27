import axios from './httpRequester';

const path = '/feed';

export const postFeed = data => axios.post(path, data);

export const getFeedList = params => axios.get(path, { params });

export const deleteFeed = params => axios.delete(path, { params });

export const getKeywordList = params => axios.get(`${path}/keyword`, { params });