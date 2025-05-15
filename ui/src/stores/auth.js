import { defineStore } from 'pinia';
import router from '../router';
import axios from 'axios';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(credentials) {
      try {
        const url = `${API_BASE_URL}/login`;
        const response = await axios.post(url, credentials);
        this.token = response.data.token;
        localStorage.setItem('token', this.token);

        this.user = response.data.user; // if your API returns user info

        // Optionally set token as default axios header
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;

        router.push({ name: 'Tasks' }); // redirect after login
      } catch (error) {
        throw error;
      }
    },
    async register(userData) {
      try {
        
        const url = `${API_BASE_URL}/register`;
        const response = await axios.post(url, userData);
        this.token = response.data.token;
        localStorage.setItem('token', this.token);

        this.user = response.data.user;

        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        router.push({ name: 'Tasks' });
      } catch (error) {
        throw error;
      }
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      router.push({ name: 'Login' });
    },
  },
});
