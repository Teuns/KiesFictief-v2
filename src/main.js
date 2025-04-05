import { createApp } from 'vue/dist/vue.esm-bundler';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import './assets/main.scss';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
