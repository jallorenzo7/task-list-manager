<template>
  
  <div class="card mt-4">
    <div class="card-body">
        <div class="row">
          <div class="col-sm-12">
            <label class="float-left">Full Name</label>
            <input type="text" v-model="form.name" class="form-control" placeholder="Enter your name" required />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <label class="float-left">Email Address</label>
            <input type="email" v-model="form.email" class="form-control" placeholder="Enter your email" required />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <label class="float-left">Password</label>
            <input type="password" v-model="form.password" class="form-control" placeholder="Enter your password" required />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <label class="float-left">Confirm Password</label>
            <input type="password" v-model="form.password_confirmation" class="form-control" placeholder="Confirm your password" required />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="btn-action">
              <button type="button" class="btn btn-primary btn-save" @click="register">Register</button>
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
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
    };
  },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    return { authStore, router };
  },
  methods: {
    async register() {
      if (this.validateForm()) {
        try {
          await this.authStore.register(this.form);
          toast.success('Registration successful! Please login.');
          this.router.push('/tasks');
        } catch (error) {
          toast.error(error.response?.data?.message || 'Registration failed.');
        }
      }
    },
    validateForm() {
      if (!this.form.name || !this.form.email || !this.form.password || !this.form.password_confirmation) {
        toast.warning('Please fill in all fields.');
        return false;
      }
      if (this.form.password !== this.form.password_confirmation) {
        toast.warning('Passwords do not match.');
        return false;
      }
      return true;
    },
  },
};
</script>

<style scoped>
.t-form-register {
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
