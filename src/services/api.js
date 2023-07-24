import axios from 'axios';

const api = axios.create({
  baseURL: 'https://twluas-backend.vercel.app/api', // Ganti dengan URL backend Anda
});

export default api;
