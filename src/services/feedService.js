import axios from './httpRequester';

const path = '/feed';

export const getFeedList = params => axios.get(path, { params });