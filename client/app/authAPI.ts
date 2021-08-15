import api from '../utils/api';

const login = async (email: string, password: string) => {
    return api.post('/user/login', {
    email,
    password,
    })
}

const details = async () => {
    const token = localStorage.getItem('token');

    return api.get('/user/details', {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
}

export { login, details }