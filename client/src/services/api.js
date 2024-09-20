import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api', 
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const register = (userData) => API.post('/auth/register', userData);
export const login = (userData) => API.post('/auth/login', userData);

export const saveDraft = (draftData) => API.post('/drafts/save', draftData);
export const getDrafts = () => API.get('/drafts');
export const generateContent = (keywords) => API.post('/drafts/generate', { keywords });

export const postContent = (postData) => API.post('/drafts/postContent', postData);