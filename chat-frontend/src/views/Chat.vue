<template>
  <div class="chat-container">
    <ChatList />
    <MessageWindow />
    <VideoCall />
  </div>
</template>

<script setup>
import ChatList from '@/components/ChatList.vue';
import MessageWindow from '@/components/MessageWindow.vue';
import VideoCall from '@/components/VideoCall.vue';
</script>

<style scoped>
.chat-container {
  display: flex;
  height: 100vh;
}
</style>
