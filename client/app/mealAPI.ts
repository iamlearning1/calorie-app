import api from '../utils/api';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
};

export const add = async (data: any) => api.post('/meal/add', data, getHeaders());

export const meals = async () => api.get('/meal/all', getHeaders());
