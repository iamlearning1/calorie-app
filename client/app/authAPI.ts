import api, { getHeaders } from '../utils/api';

const login = async (email: string, password: string) => api.post('/user/login', {
  email,
  password,
});

const details = async () => api.get('/user/details', getHeaders());

export { login, details };
