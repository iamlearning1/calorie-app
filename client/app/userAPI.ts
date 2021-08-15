import api, { getHeaders } from '../utils/api';

export const users = async () => api.get('/user/all', getHeaders());

export const report = async () => api.get('/user/all/report', getHeaders());

export const share = async (data: any) => api.post('/user/share', data, getHeaders());
