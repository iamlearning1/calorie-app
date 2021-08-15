import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
};

export default api;
