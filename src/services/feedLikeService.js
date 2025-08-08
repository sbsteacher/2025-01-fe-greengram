import axios from './httpRequester';

const path = '/feed/like';

export const toggleFeedLike = data => axios.post(path, data).catch((e) => e.response);