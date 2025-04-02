<template>
  <div class="video-call">
    <button @click="startCall">📞 Start Video Call</button>
    <video ref="localVideo" autoplay playsinline></video>
    <video ref="remoteVideo" autoplay playsinline></video>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import * as WebRTC from 'vue-webrtc';
console.log(WebRTC);

import { useWebRTC } from 'vue-webrtc';

const localVideo = ref(null);
const remoteVideo = ref(null);

const { startLocalStream, createOffer, handleOffer } = useWebRTC();

const startCall = async () => {
  await startLocalStream(localVideo.value);
  const offer = await createOffer();
  console.log('Offer:', offer);
};
</script>

<style scoped>
.video-call {
  position: fixed;
  bottom: 10px;
  right: 10px;
}
</style>
