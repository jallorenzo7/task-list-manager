<template>
  <div class="card mt-4">
    <div class="card-body">
      <div class="form-floating">
        <div class="row">
          <div class="col-sm-12">
            <label class="float-left">Email Address</label>
            <input type="email" v-model="form.email" class="form-control" placeholder="Enter your email" required />
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-sm-12">
            <label class="float-left">Password</label>
            <input type="password" v-model="form.password" class="form-control" placeholder="Enter your password" required />
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-sm-12">
            <div class="btn-action">
              <button type="button" class="btn btn-primary " style="margin-right: 15px;" @click="login">Login</button>
              <router-link class="btn btn-warning ml-3" to="/register">Register</router-link> 
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    };
  },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    return { authStore, router };
  },
  methods: {
    async login() {
      if (this.validateForm()) {
        try {
          await this.authStore.login(this.form);
          toast.success('Login successful!');
          this.router.push('/tasks');
        } catch (error) {
          toast.error(error.response?.data?.message || 'Login failed.');
        }
      }
    },
    validateForm() {
      if (!this.form.email || !this.form.password) {
        toast.warning('Please fill in both email and password.');
        return false;
      }
      return true;
    },
  },
};
</script>

<style scoped>
.t-form-login {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  max-width: 500px;
  margin: 0 auto;
}

.btn-action {
  margin-top: 20px;
  text-align: center;
}

.btn-save {
  padding: 10px 30px;
}
</style>
