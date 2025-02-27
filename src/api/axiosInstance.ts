import axios from 'axios';
import { store } from '../store/store'; // Import the Redux store
import { logoutAccount } from '../store/slices/authSlice';

// Create an Axios instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.example.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to automatically attach the auth token
api.interceptors.request.use(
    (config) => {
        const state = store.getState(); // Get the current state from Redux store
        const token = state.auth.token; // Get token from auth slice

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
// Handle errors globally
api.interceptors.response.use(
    (response) => {
        //add handling new token if there is one
        if(response.data.accessToken){
        {
            
        }    
        }
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            console.error('Unauthorized! Logging out...');
            store.dispatch(logoutAccount()); // Dispatch logout action
            window.location.href = '/login'; // Redirect to login
        }
        return Promise.reject(error);
    }
);
export default api;
