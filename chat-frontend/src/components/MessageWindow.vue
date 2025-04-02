<template>
  <div class="message-window">
    <h3>Chat with {{ selectedUser.name }}</h3>
    <div v-for="msg in messages" :key="msg.id">
      <p>{{ msg.text }}</p>
    </div>
    <input v-model="newMessage" placeholder="Type a message..." @keyup.enter="sendMessage" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedUser = ref({ name: 'Kanon Ahamed' });
const messages = ref([{ id: 1, text: 'Hello!' }]);
const newMessage = ref('');

const sendMessage = () => {
  messages.value.push({ id: messages.value.length + 1, text: newMessage.value });
  newMessage.value = '';
};
</script>

<style scoped>
.message-window {
  width: 70%;
  padding: 10px;
}
</style>
