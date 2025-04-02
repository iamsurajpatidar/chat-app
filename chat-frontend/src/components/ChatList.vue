<template>
  <div class="chat-list">
    <h3>Chats</h3>
    <ul>
      <li v-for="user in users" :key="user.id" @click="selectUser(user)">
        {{ user.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const users = ref([
  { id: 1, name: 'Kanon Ahamed' },
  { id: 2, name: 'Shaikil Khan' },
]);

const selectUser = (user) => {
  console.log('Selected user:', user.name);
};
</script>

<style scoped>
.chat-list {
  width: 30%;
  border-right: 1px solid #ccc;
}
</style>
