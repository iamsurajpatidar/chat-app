<template>
  <div class="login-container">
    <h2>Log in!</h2>
    <input v-model="username" placeholder="Username" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="handleLogin">Log in</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const authStore = useAuthStore();
const router = useRouter();

const handleLogin = () => {
  authStore.login(username.value);
  router.push('/chat');
};
</script>

<style scoped>
/* Add CSS styling */
</style>
