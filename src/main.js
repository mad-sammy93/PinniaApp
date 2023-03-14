import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'

import router from './router/index.js';
// import store from './stores/Task/TaskStore.js';

import './assets/main.css'


const pinia = createPinia()
const app = createApp(App);

app.use(pinia);
app.use(router);
// app.use(store);

app.mount('#app');
