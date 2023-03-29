import { createPinia } from 'pinia'
import { createApp, defineAsyncComponent } from 'vue'
import App from './App.vue'

import router from './router/index.js';
// import store from './stores/Task/TaskStore.js';

import './assets/main.css'

const TheModal = defineAsyncComponent(() => import('./components/UI/TheModal.vue'));

const pinia = createPinia()
const app = createApp(App);

app.use(pinia);
app.use(router);
app.component('the-modal', TheModal);
// app.use(store);

app.mount('#app');
