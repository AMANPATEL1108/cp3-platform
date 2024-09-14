import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api', // Ensure this is correct
});

api.interceptors.request.use(
    (config) => {
        if (typeof localStorage !== 'undefined') {
            const token = localStorage.getItem('adminToken');
            console.log('Retrieved token:', token); // Debugging line
            if (token) {
                config.headers['x-auth-token'] = token;
            }
        } else {
            console.log('localStorage is not available');
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;