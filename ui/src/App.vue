<template>
  <div id="app">
    <header>
      <nav>
        <div class="row">
          <div class="col-12">
            <a href="#" class="btn float-right" v-if="isAuthenticated" @click="logout">Logout</a>
          </div>
        </div>
      </nav>
    </header>

    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from './stores/auth';

const authStore = useAuthStore();

const isAuthenticated = computed(() => authStore.isAuthenticated);

function logout() {
  authStore.logout();
}
</script>

<style>
#app {
  max-width: 600px;
  margin: 0 auto;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

nav {
  margin-bottom: 1rem;
}

button {
  cursor: pointer;
}
</style>
