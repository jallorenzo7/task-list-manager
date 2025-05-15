import { defineStore } from 'pinia';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [],
    loading: false,
  }),

  actions: {
    async fetchTasks() {
      this.loading = true;
      const token = await localStorage.getItem('token');
      try {
        const response = await axios.get(`${API_BASE_URL}/tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.tasks = response.data;
      } catch (error) {
        throw error.response?.data || error;
      } finally {
        this.loading = false;
      }
    },

    async addTask(task) {
      const token = await localStorage.getItem('token');
      try {
        const response = await axios.post(`${API_BASE_URL}/tasks`, task, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.tasks.push(response.data);
      } catch (error) {
        throw error.response?.data || error;
      }
    },

    async updateTask(task) {
      
      const token = await localStorage.getItem('token');
      try {
        const response = await axios.put(`${API_BASE_URL}/tasks/${task.id}`, task, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const index = this.tasks.findIndex((t) => t.id === task.id);
        if (index !== -1) this.tasks[index] = response.data;
      } catch (error) {
        throw error.response?.data || error;
      }
    },

    async deleteTask(taskId) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${API_BASE_URL}/tasks/${taskId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
      } catch (error) {
        throw error.response?.data || error;
      }
    },
  },
});
