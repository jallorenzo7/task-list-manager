import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/LoginView.vue';
import Register from '../views/RegisterView.vue';
import Tasks from '../views/TaskView.vue';
import { useAuthStore } from '../stores/auth';

const routes = [
  { path: '/', redirect: '/tasks' },

  { path: '/login', component: Login, name: 'Login' },
  { path: '/register', component: Register, name: 'register' },

  {
    path: '/tasks',
    component: Tasks,
    name: 'Tasks',
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
