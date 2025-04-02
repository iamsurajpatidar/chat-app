import { createApp } from 'vue';
import { createPinia } from 'pinia'; // Import Pinia
import App from './App.vue';
import router from './router';

const app = createApp(App);
const pinia = createPinia(); // Create Pinia instance

app.use(pinia); // Register Pinia before using any stores
app.use(router);
app.mount('#app');
