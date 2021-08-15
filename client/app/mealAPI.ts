import api, { getHeaders } from '../utils/api';

export const add = async (data: any) => api.post('/meal/add', data, getHeaders());

export const remove = async (id: string) => api.delete(`/meal/${id}`, getHeaders());

export const meals = async () => api.get('/meal/all', getHeaders());

export const meal = async (id: string) => api.get(`/meal/${id}`, getHeaders());

export const update = async (data: any) => api.put(`/meal/${data.id}`, data, getHeaders());
