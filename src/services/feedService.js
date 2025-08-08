import axios from './httpRequester';

const path = '/feed';

export const postFeed = data => axios.post(path, data).catch(e => e.response);

export const getFeedList = params => axios.get(path, { params }).catch(e => e.response);;