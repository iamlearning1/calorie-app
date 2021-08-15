import api, { getHeaders } from '../utils/api';

export const users = async () => api.get('/user/all', getHeaders());
