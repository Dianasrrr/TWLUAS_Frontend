import axios from 'axios';

const API_URL = 'https://twluas-backend.vercel.app/auth';

export const register = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { username, password });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { username, password });
        const { token, role } = response.data;
        return { token, role };
    } catch (error) {
        throw error;
    }
};

